import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import Toast from 'react-native-root-toast';
import Toast from 'react-native-toast-message';
import { Animated, Button, View, Text, TouchableOpacity, Linking, Pressable, StyleSheet, Switch } from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';
import {
    Camera,
    runAtTargetFps,
    useCameraPermission,
    useMicrophonePermission,
    useCameraDevice,
    useCameraFormat,
    useFrameProcessor,
} from 'react-native-vision-camera';
import { runOnJS } from 'react-native-reanimated';
import { useIsFocused} from '@react-navigation/native';
import {useAppState} from '@react-native-community/hooks'
import { useWebSocket } from '../util/useWebSocket';
// import {
//   DetectedObject,
//   detectObjects,
//   FrameProcessorConfig,
// } from 'vision-camera-realtime-object-detection';
// import { useTensorflowModel } from "react-native-fast-tflite";
import { DisplayCheckedList } from '../components/DisplayCheckedList';
import { useResizePlugin } from 'vision-camera-resize-plugin';
import * as Haptics from 'expo-haptics';
import { MusicButton } from '../components/MusicButton';
import { useSound } from '../util/SoundProvider';
import { SoundButton } from '../components/SoundButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NeonLight } from '../components/neonLight';
import { ShowMenuButton } from '../components/showMenuButton';
import { YouTubePlayer } from '../components/YouTubePlayer'
import { AntDesign,Entypo,Foundation,Ionicons,MaterialIcons,MaterialCommunityIcons,Octicons,SimpleLineIcons, } from '@expo/vector-icons';
// import { YouTubeButton } from '../components/YouTubeBotton' 
// import { YouTubeModal } from '../components/YouTubeModal';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { CameraButton } from '../components/cameraButton';
import { CornerBorder } from '../components/CornerBorder';
import { DisplayMedia } from '../components/DisplayMedia';
// import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions" 
import * as MediaLibrary from 'expo-media-library';
import { center } from '@shopify/react-native-skia';

export default function CameraScreen() {
    // Add global unhandled rejection handler
    global.onunhandledrejection = (error) => {
        console.error('Unhandled Rejection:', error.reason);
        // Handle the unhandled rejection here
    };

    //***For development :
    //  const fullChecklistString = {
    //       stepIndex: 0,
    //       timestamp: '00:00:02',
    //     //   objects: { 'leek': false, 'knife': true, 'cutting board': true },
    //       actions: { 'place the leek on top of the cutting board': true }
    //     };

      //***For production :
      const [fullChecklistString, setFullChecklistString] = useState(null);
      
      // Access the route object to get the passed data
      const { isJsonData, jsonData, videoId } = useLocalSearchParams();
    console.log('isJsonData in cameraScreen.js:', isJsonData);
    console.log('jsonData in cameraScreen.js:', jsonData);
    console.log('videoId in cameraScreen.js:', videoId);

    //   const route = useRoute();

    const {socket, isWebSocketOpen} = useWebSocket();
    console.log("isWebSocketOpen in cameraScreen:", isWebSocketOpen);
    // console.log("WebSocket instance:", socket);

    const isFocused = useIsFocused()
    const appState = useAppState()
    const isActive = isFocused && appState === "active"
    const { resize } = useResizePlugin();
    const [isSendingFrames, setIsSendingFrames] = useState(false); // State to track if frames are being sent
    const { hasPermission : hasCameraPermission, requestPermission : requestCameraPermission } = useCameraPermission();
    const { hasPermission: hasMicrophonePermission, requestPermission: requestMicrophonePermission  } = useMicrophonePermission();
    const [isRecording, setIsRecording] = useState(false);
    const [selectedCamera, setSelectedCamera] = useState('back');
    const [isPaused, setIsPaused] = useState(false);
    const [isRightPosition, setIsRightPosition] = useState(true);

    const { playSound, soundEnabled } = useSound();
    const insets = useSafeAreaInsets();

    function haptics(type) {
        Haptics.impactAsync(type);
    }
    
    // Usage
    const light = Haptics.ImpactFeedbackStyle.Light; // Change this to the desired type
    const medium = Haptics.ImpactFeedbackStyle.Medium; // Change this to the desired type
    const heavy = Haptics.ImpactFeedbackStyle.Heavy; // Change this to the desired type

    const buttonClickSound = require('../assets/shooting-sound-fx-159024.mp3');
    const videoRecordClickSound = require('../assets/beep-6-96243.mp3');
    const AIdetectionClickSound = require('../assets/greanpatch-166007.mp3');
    const flipCameraSound = require('../assets/pageturn-102978.mp3');
    const flipIconsSound = require('../assets/pageturn-102978.mp3');
    const takeSnapSound = require('../assets/camera-13695.mp3');
    const takePhotoSound = require('../assets/iphone-camera-capture-6448.mp3');

    const togglePosition = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        if(soundEnabled){
        playSound(flipIconsSound);
        }
        setIsRightPosition(!isRightPosition);
    };

    const toggleCamera = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        if(soundEnabled){
        playSound(flipCameraSound);
        }
        setSelectedCamera(prevCamera => (prevCamera === 'front' ? 'back' : 'front'));
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    const device = useCameraDevice(selectedCamera);
    const format = useCameraFormat(device, [
        { videoResolution: 'max' },
        { photoResolution: 'max' },
        // { fps: 60 }
        // { fps: 1 }
      ])
    //   console.log("format.minFps:",format.minFps);

    // const fps = format.maxFps >= 240 ? 240 : format.maxFps
    // const fps = format.maxFps >= 1 ? 1 : format.maxFps

    // Now you can use workletsEnabled to track if Worklets are enabled and show it on the UI
 
    const [photoUri, setPhotoUri] = useState(null);
    const [videoUri, setVideoUri] = useState(null);

    const camera = useRef(null);


    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    
    useEffect(() => {
        const checkPermission = async () => {
            console.log("permissionResponse:",permissionResponse);
            if (permissionResponse?.status !== 'granted') {
                const { status } = await requestPermission();
                console.log("status :", status);
                if (status !== 'granted') {
                    // Handle case where permission is still not granted
                    console.log('Permission not granted.');
                }
            }
        };

        checkPermission();
    }, [permissionResponse?.status, requestPermission]);
  

    const onTakePicture = async() =>{
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        haptics(heavy);
        if(soundEnabled){
        playSound(takePhotoSound);
        }
        try {
            const photo = await camera.current?.takePhoto({
                enableShutterSound: false,
                enableAutoRedEyeReduction: true
                // flash: 'auto'
                // console.log("photo:", photo);
            });
            const uri = photo.path;
            console.log("photo uri:", uri);
            setPhotoUri(uri); // Set the URI of the taken photo
            setVideoUri(null); // Reset the video URI
            try {
            const asset = await MediaLibrary.createAssetAsync(uri);

            // Specify the album name you want to save the asset to
            const albumName = 'Rarbit';

            // Check if the album already exists, if not, create it
            const album = await MediaLibrary.getAlbumAsync(albumName);
            if (album === null) {
                await MediaLibrary.createAlbumAsync(albumName, asset, false);
            } else {
                // If the album exists, add the asset to it
                await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
            }

                console.log('Asset saved to album successfully!');
            } catch (error) {
                console.error('Error saving asset to album:', error);
            }
        } catch (error) {
            console.error("Error while taking or saving photo:", error);
            // Handle the error here, such as displaying an error message to the user or logging the error for further investigation
        }
    };

    const onTakeSnapshot = async() =>{
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        haptics(heavy);
        if(soundEnabled){
        playSound(takeSnapSound);
        }
        try {
            const snapshot = await camera.current.takeSnapshot({
                quality: 100
              })
            // console.log("snapshot:", snapshot);
            const uri = snapshot.path;
            console.log("uri:", uri);
            setPhotoUri(uri); // Set the URI of the taken photo
            setVideoUri(null); // Reset the video URI
            try {
                const asset = await MediaLibrary.createAssetAsync(uri);
    
                // Specify the album name you want to save the asset to
                const albumName = 'Rarbit';
    
                // Check if the album already exists, if not, create it
                const album = await MediaLibrary.getAlbumAsync(albumName);
                if (album === null) {
                    await MediaLibrary.createAlbumAsync(albumName, asset, false);
                } else {
                    // If the album exists, add the asset to it
                    await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                }
    
                    console.log('Asset saved to album successfully!');
                } catch (error) {
                    console.error('Error saving asset to album:', error);
                }
        } catch (error) {
            console.error("Error while taking or saving snapshot:", error);
            // Handle the error here, such as displaying an error message to the user or logging the error for further investigation
        }
    };

    const toggleRecord = async () => {
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        haptics(heavy);
        if(soundEnabled){
        playSound(videoRecordClickSound);
        }
        try {
            if (!isRecording) {
                await camera.current.startRecording({
                    // VisionCamera also supports H.265 (HEVC), 
                    // which is much more efficient in encoding performance and can be up to 50% smaller in file size.
                    // If you can handle H.265 on your backend, configure the video recorder to encode in H.265:
                    // If the device does not support h265,
                    // VisionCamera will automatically fall-back to a supported codec like h264 instead.
                    videoCodec: 'h265',
                    onRecordingFinished: async (video) => {
                        const videoPath = video.path;
                        const uri = `file://${video.path}`;
                        console.log("video path :", videoPath);
                        //  setVideoUri(videoPath) // Set the URI of the recorded video
                        setVideoUri(videoPath); // Set the URI of the recorded video
                        setPhotoUri(null); // Reset the video URI
                        console.log("videoUri after setting:",videoUri);
                        try {
                            const asset = await MediaLibrary.createAssetAsync(uri);
                
                            // Specify the album name you want to save the asset to
                            const albumName = 'Rarbit';
                
                            // Check if the album already exists, if not, create it
                            const album = await MediaLibrary.getAlbumAsync(albumName);
                            if (album === null) {
                                await MediaLibrary.createAlbumAsync(albumName, asset, false);
                            } else {
                                // If the album exists, add the asset to it
                                await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                            }
                
                                console.log('Asset saved to album successfully!');
                            } catch (error) {
                                console.error('Error saving asset to album:', error);
                            }
                    },
                    onRecordingError: (error) => console.error('Recording error:', error)
                });
                setIsRecording(true);
                setIsPaused(false);
            } else {
                await camera.current.stopRecording();
                setIsRecording(false);
                setIsPaused(false);
            }
        } catch (error) {
            console.error("Error while recording video:", error);
            // Handle the error here, such as displaying an error message to the user or logging the error for further investigation
        }
    };
    

    const togglePause = async () => {
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        haptics(heavy);
        if(soundEnabled){
        playSound(videoRecordClickSound);
        }
        try {
            if (!isRecording) {
                // If the camera is not recording, return early
                return;
            }
            
            if (!isPaused) {
                await camera.current.pauseRecording();
                setIsPaused(true);
            } else {
                await camera.current.resumeRecording();
                setIsPaused(false);
            }

        } catch (error) {
            console.error("Error while toggling pause:", error);
            // Handle the error here, such as displaying an error message to the user or logging the error for further investigation
        }
    };
    
    // console.log('responseData in Checkbox.jsx:', JSON.stringify(responseData, null, 2));
    // Object.entries(responseData).forEach(([key, value]) => {
    //     console.log(`${key}:`, value);
    // });
    // const route = useRoute();
    // console.log('route in CameraScreen.jsx:', route);
    // const jsonData = route.params.jsonData;
    // console.log('jsonData in CameraScreen.jsx :', jsonData);

    // const devices = useCameraDevices('wide-angle-camera')
    // const device = devices.front;
    // const frameProcessorConfig = {
    //   modelFile: 'SSD_MobileNet_V2_FPNLite_640x640.tflite', // <!-- name and extension of your model
    //   scoreThreshold: 0.5,
    // };
    // const [model, setModel] = useState(null);

    // use this one:
    // const model = useTensorflowModel({
    //     url: 'https://tfhub.dev/google/lite-model/object_detection_v1.tflite'
    // });

    // const model = useTensorflowModel(
    //     'https://tfhub.dev/google/lite-model/object_detection_v1.tflite'
    //     // 'core-ml',
    // );

    // const objectDetection = useTensorflowModel(
    //   require('../../assets/model/SSD_MobileNet_V2_FPNLite_640x640.tflite'),
    // );
    // Remote URL
    // const objectDetection = loadTensorflowModel(
    //     'https://tfhub.dev/google/lite-model/object_detection_v1.tflite',
    //     'core-ml',
    // );
    // const model =
    // objectDetection.state === 'loaded' ? objectDetection.model : undefined;
    // const model = await loadTensorflowModel(
    //     'https://tfhub.dev/google/lite-model/object_detection_v1.tflite',
    //     'core-ml',
    // );
    // useEffect(() => {
    //     const fetchModel = async () => {
    //         // const model = await loadTensorflowModel(
    //         //     'https://tfhub.dev/google/lite-model/object_detection_v1.tflite',
    //         //     'core-ml',
    //         // );
    //         const model = useTensorflowModel(
    //             'https://tfhub.dev/google/lite-model/object_detection_v1.tflite',
    //             'core-ml',
    //         );
    //         // const response = await fetch('https://tfhub.dev/google/lite-model/object_detection_v1.tflite');
    //         // console.log("response from fetch:", response);
    //         // const modelData = await response.arrayBuffer();
    //         // console.log("modelData:", modelData);
    //         // const model = await loadTensorflowModel(modelData, 'core-ml');
    //         console.log("model:", model);
    //         // Once the model is loaded, you can set it to state
    //         setModel(model);
    //     };

    //     fetchModel(); // Call the async function to load the model
    // }, []); // Run only once on component mount


    // useEffect(() => {
    //     Camera.requestCameraPermission().then((p) =>
    //         setHasPermission(p === 'granted')
    //     )
    // }, [])
    useEffect(() => {
        if (!hasCameraPermission) {
            // If the user hasn't granted camera permission yet, request it
            requestCameraPermission();
        }
    }, [hasCameraPermission, requestCameraPermission]);
    
    useEffect(() => {
        if (!hasMicrophonePermission) {
            // If the user hasn't granted camera permission yet, request it
            requestMicrophonePermission();
        }
    }, [hasMicrophonePermission, requestMicrophonePermission]);
    // useEffect(() => {
    //     async function getPermission() {
    //       const permission = await Camera.requestCameraPermission();
    //       console.log(`Camera permission status: ${permission}`);
    //       if (permission === 'denied') await Linking.openSettings();
    //     }
    //     getPermission();
    //   }, []);

    useEffect(() => {
        if (isWebSocketOpen) {
            console.log('WebSocket connection opened successfully in cameraScreen');
        }
    }, [isWebSocketOpen]);

    useEffect(() => {
        if (!socket) return;

        socket.on('fullChecklistString', (fullChecklistString) => {
            try {
                console.log(
                    'Received parsed fullChecklistString on client side ws :',
                    fullChecklistString,
                );
                setFullChecklistString(fullChecklistString);
            } catch (error) {
                console.error('Error processing WebSocket message:', error);
            }
        });

        socket.on('error', error => {
            console.error('WebSocket error in cameraScreen:', error);
        });

        socket.on('disconnect', () => {
            console.log('WebSocket connection closed in cameraScreen');
        });

        return () => {
            socket.close();
        };
    }, [socket]);

    // Function to handle WebSocket operations
// const handleWebSocket = useRunInJS((frameData, jsonData) =>{
    const handleWebSocket = Worklets.createRunOnJS((frame) =>{
        // Perform WebSocket operations here, such as establishing a connection and sending data
        // Replace the following lines with your WebSocket code
        // Send frames to WebSocket
        console.log("Start sending frames via WebSocket");
        if (isWebSocketOpen) {
            // Send frameMessage to Socket.IO server
            // const frame = pixelsArray;
            socket.emit('frame', frame);
            // console.log("Frame in RGB:", frame);
        }
    },);
  
    // 1fps example
    // const frameProcessor = useFrameProcessor((frame) => {
    //     'worklet'
    //     // console.log('New Frame')
    //     // this will log at the speed of 60fps
    //     runAtTargetFps(1, () => {
    //       'worklet'
    //     //   const faces = detectFaces(frame)
    //     //   console.log(`Detected a new face: ${faces[0]}`)
    //       console.log("running at 1 fps")
    //     })
    //   })

   // Define frame processing function using useFrameProcessor hook
    const frameProcessor = useFrameProcessor((frame) => {
        'worklet';

        // Wrap the frame processing logic inside runAtTargetFps
        runAtTargetFps(1, () => {
            'worklet';
            if (isSendingFrames) {
                console.log(`Frame: ${frame.width}x${frame.height} (${frame.pixelFormat})`);
                console.log("isSendingFrames turns true now, the toggle button is clicked.");

                try {
                    // Call the handleWebSocket function from the main thread
                    console.log("starting handleWebSocket() in the main thread.");

                    // Resize the frame
                    const resizedFrame = resize(frame, {
                        scale: {
                            width: 192,
                            height: 192,
                        },
                        pixelFormat: 'rgb',
                        dataType: 'uint8',
                    });

                    const pixelsArray = Object.values(resizedFrame);
                    
                    handleWebSocket(pixelsArray);
                } catch (error) {
                    console.error(
                        'Error while processing frame or sending data to WebSocket:',
                        error,
                    );
                }
            }
        });
    }, [isSendingFrames]);
       
    // useEffect(() => {
    //     return () => {
    //         // Clean up WebSocket connection when unmounting
    //         if (websocket) {
    //             websocket.close();
    //         }
    //     };
    // }, [websocket]);

    // Function to toggle sending frames
    const toggleSendingFrames = () => {
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        haptics(heavy);
        if(soundEnabled){
        playSound(AIdetectionClickSound);
        }
        console.log("toggle button is clicked.")

          // If isSync is true, start recording immediately
          if ( isSync && !isRecording ) {
            console.log("isSendingFrames and isRecording are in sync. Starting recording...");
            toggleRecord(); // Start Recording
        }

        if (!isWebSocketOpen) {
            Toast.show({
                type:'success',
                text1:'Please wait a moment as we connect you to the AI channel.\n\nIf it takes longer than expected, simply reload the app.',
                text2: 'For quick dismissal, Swipe Up. This message will be automatically dismissed after 10 seconds.',
                height: 200,
                position: 'top',
                visibilityTime : 10000,
                swipeable: true,
                topOffset : 80,
                autoHide : true,
                keyboardOffset:10,
            });
            console.log("Toast is called.");
            return;
        }

        if (!isJsonData) {
            Toast.show({
                type:'success',
                text1:'To start detection, kindly navigate to the Home Screen and upload your content before proceeding.',
                text2:'For quick dismissal, Swipe Up. This message will be automatically dismissed after 10 seconds.',
                position:'top',
                visibilityTime : 10000,
                swipeable: true,
                topOffset : 80,
                autoHide : true,
                keyboardOffset:10,
            });
            
            console.log("Toast is called.");
            return;
        }
        // setIsSendingFrames(prevState => !prevState); // Toggle the state
        // setIsSendingFrames(prevState => {
        //     console.log("Previous isSendingFrames state:", prevState);
        //     return !prevState; // Toggle the state
        // });
        const newIsSendingFramesState = !isSendingFrames; // Calculate the new state value
        console.log("New isSendingFrames state:", newIsSendingFramesState); // Log the new state value
        setIsSendingFrames(newIsSendingFramesState); // Update the state
        console.log("isSendingFrames button is pressed.");

        // If isSync is true and isRecording is true, and isSendingFrames is false,
        // then pause the recording
        // if (isSync && isRecording && !isSendingFrames) {
        //     console.log("(Sync mode)isSendingFrames is false and isRecording is true. Pausing recording...");
        //     togglePause(); // Pause recording
        // }
    };

        // Use useEffect to trigger togglePause when isSendingFrames changes
        useEffect(() => {
            if (isSync && isRecording && (!isPaused && !isSendingFrames)) {
                console.log("(Sync mode)isSendingFrames is false and isRecording is true. Pausing recording...");
                togglePause(); // Pause recording
            }
        }, [isSendingFrames, isRecording, isSync]);

        useEffect(() => {
            if (isSync && isRecording && (isPaused && !isSendingFrames)) {
                console.log("(Sync mode) isSendingFrames is false and isRecording is true. Pausing recording...");
                togglePause(); // Resume recording
            }
        }, [isSendingFrames, isRecording, isSync]);     

        useEffect(() => {
            if (isSync && isRecording && (isPaused && isSendingFrames)) {
                console.log("(Sync mode) isSendingFrames is false and isRecording is true. Pausing recording...");
                togglePause(); // Resume recording
            }
        }, [isSendingFrames, isRecording, isSync]);        

    console.log("isSendingFrames :", isSendingFrames);
    // Determine the connection status based on the socket
    const connectionStatus = socket ? 'Exist' : 'Not Exist';
    console.log("connectionStatus:",connectionStatus);

//     const [modalVisible, setModalVisible] = useState(false);

//     const handleOpenModal = () => {
//       setModalVisible(true);
//     };
  
//     const handleCloseModal = () => {
//       setModalVisible(false);
//     };

//     const [selectedTab, setSelectedTab] = useState('aiResult');

//   const toggleTab = (tab) => {
//     setSelectedTab(tab);
//   };

    // hooks
    const sheetRef = useRef(null);

    // variables
    // const data = useMemo(
    //   () =>
    //     Array(50)
    //       .fill(0)
    //       .map((_, index) => `index-${index}`),
    //   []
    // );

    const snapPoints = useMemo(() => ["25%","35%", "70%"], []);
  
    // callbacks
    const handleSheetChange = useCallback((index) => {
      console.log("handleSheetChange", index);
    }, []);
    const handleSnapPress = useCallback((index) => {
      sheetRef.current?.snapToIndex(index);
    }, []);
    const handleClosePress = useCallback(() => {
      sheetRef.current?.close();
    }, []);

    const [snapState, setSnapState] = useState(1); // Initial state
  
    const toggleSnapPoints = () => {
        const newState = snapState === 2 ? 1 : 2; // Toggle between 0 and 1
        setSnapState(newState);
        handleSnapPress(newState);
    };
    // render
    // const renderItem = useCallback(
    //   (item) => (
    //     <View key={item} style={styles.itemContainer}>
    //       <Text>{item}</Text>
    //     </View>
    //   ),
    //   []
    // );

    const focus = useCallback((point) => {
        const c = camera.current
        if (c == null) return
        c.focus(point)
      }, [])
    
    //   const gesture = Gesture.Tap()
    //     .onEnd(({ x, y }) => {
    //       runOnJS(focus)({ x, y })
    //     })

    const boxPosition = useRef(new Animated.ValueXY({ x: -100, y: -100 })).current; // Initialize with default values
    const [boxOpacity] = useState(new Animated.Value(1)); 
    const [boxScale] = useState(new Animated.Value(1));
    
    const handleTap = (event) => {
        // console.log('Tapped!');
        const { locationX, locationY } = event.nativeEvent;
        // console.log("x:",locationX);
        // console.log("y:",locationY);

         // Update the boxPosition to the tapped location
         // boxPosition should be minus by the Animated.View width & height
        //  boxPosition.setValue({ x: locationX - 32.5 , y: locationY - 32.5 });

         // Log the updated x and y coordinates of boxPosition
        // console.log("boxPosition x:", boxPosition.x);
        // console.log("boxPosition y:", boxPosition.y);

        // Animate the position of the yellow box to the tapped location
        Animated.timing(boxPosition, {
            toValue: { x: locationX - 32.5, y: locationY - 32.5 },
            duration: 300,
            useNativeDriver: false,
        }).start();

        // Animate the box to shrink
        Animated.timing(boxScale, {
            toValue: 0.8, // Shrink to half the original size
            duration: 300, // Animation duration
            useNativeDriver: false, // Ensure useNativeDriver is set to false for opacity animation
        }).start(() => {
            // After shrinking animation completes, animate the box to enlarge back to its original size
            Animated.timing(boxScale, {
                toValue: 1, // Enlarge back to original size
                duration: 300, // Animation duration
                useNativeDriver: false, // Ensure useNativeDriver is set to false for opacity animation
            }).start();
        });

            // Reset the box opacity to 1 to make it fully visible
            Animated.timing(boxOpacity, {
                toValue: 1, // Reset the opacity to 1
                duration: 0, // No animation duration needed
                useNativeDriver: false, // Ensure useNativeDriver is set to false for opacity animation
            }).start();
        
            // Call the focus function with the tapped location
            focus({ x: locationX, y: locationY });

            setTimeout(() => {
                // Update the box style to make it transparent
                Animated.timing(boxOpacity, {
                    toValue: 0, // Make the opacity 0 to make the box transparent
                    duration: 300, // Optional: animation duration
                    useNativeDriver: false, // Ensure useNativeDriver is set to false for opacity animation
                }).start();
            }, 3000); // 3000 milliseconds = 3 seconds
    };

    const[isSync, setIsSync]= useState(false);

    function toggleSync (){
        if(isSendingFrames){
            setIsRecording(!isRecording);
            console.log("toggleRecord is called inside toggleSync.")
        };
        setIsSync(!isSync);
        console.log("isSync button is pressed.")
    };

    return (
        <>
        {/* <View
            style={{
            // paddingTop: insets.top,
            // paddingLeft: insets.left,
            // paddingBottom: insets.bottom,
            // paddingRight: insets.right,
            }}
            /> */}
        {/* <View className="flex-2/3 bg-black"> */}
        
        <GestureHandlerRootView style={{ flex: 1 }}>
            {device ? (
                <>
                <View style={{ flex: 1 }} onTouchEnd={handleTap}>
                    {/* Yellow Bounding Box */}
                    <Animated.View
                    style={[
                        { 
                          position: 'absolute',
                          width: 75,
                          height: 75,
                          opacity: boxOpacity, 
                          zIndex: 999, // Set zIndex to ensure it's rendered on top
                          transform: [{ scale: boxScale }] // Apply scaling transformation
                        },
                        boxPosition.getLayout(),
                      ]}
                    >
                      <CornerBorder width={25} height={25} borderWidth={3} borderRadius={10} borderColor={'#F3E7E9'}/>
                    </Animated.View>
                    
                {/* <GestureDetector gesture={gesture}> */}
                    <Camera
                        ref={camera}
                        // style={{ flex: 1 }}
                        style={StyleSheet.absoluteFill}
                        device={device}
                        format={format}
                        // fps={fps}
                        // fps={1}
                        isActive={isActive}
                        video={true}
                        photo={true}
                        audio={true}
                        // video={hasCameraPermission}
                        // photo={hasCameraPermission}
                        // audio={hasMicrophonePermission}
                        // frameProcessor={throttledFrameProcessor}
                        frameProcessor={frameProcessor}
                        // qualityBalance="speed"
                    />
                    {/* </GestureDetector> */}
                    </View>
                </>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Camera not available</Text>
                </View>
            )}
           <View
                style={{
                    flex: 1,
                    position: 'absolute',
                    top: 70,
                    ...(isRightPosition ? { right: 10 } : { left: 10 }), // Dynamic styles
                    // flexDirection: 'row-reverse',
                    // alignItems: 'center'
                }}
            >
            <ShowMenuButton>
            <View className="flex-col h-full">
                    <CameraButton
                        onPress={toggleCamera}
                    >
                        {/* <MaterialIcons name="cameraswitch" size={35} color="#eaeaea" /> */}
                        <MaterialIcons 
                            name="cameraswitch" 
                            size={35} 
                            // color="#727272" 
                            color="#eaeaea" 
                            style={{ 
                                // shadowColor: '#f60ee0', 
                                // shadowOffset: { width: 2, height: 2 }, 
                                // shadowOpacity: 1, 
                                // shadowRadius: 10, 
                                // elevation: 5 // This is for Android elevation
                            }} 
                        />
                    </CameraButton>
                    <CameraButton
                        onPress={onTakeSnapshot}
                    >
                        <MaterialIcons name="enhance-photo-translate" size={30} color="#eaeaea" />
                    </CameraButton>
                    <CameraButton
                        onPress={onTakePicture}
                    >
                        <Entypo name="camera" size={30} color="#eaeaea" />
                    </CameraButton>
                    <CameraButton
                        isSendingFrames={isSendingFrames}
                        onPress={toggleSendingFrames}
                    >
                        <Text className="text-ai-gray text-2xl font-bold">AI</Text>
                    </CameraButton>
                    <CameraButton
                        isRecording={isRecording}
                        onPress={toggleRecord}
                    >
                        <Ionicons name="videocam" size={30} color="#eaeaea" />
                    </CameraButton>
                    { isRecording && ( 
                        <CameraButton 
                            isPaused={isPaused}
                            isRecording={isRecording}
                            onPress={togglePause}
                            disabled={!isRecording}      
                        >
                            {isPaused ? (
                                    <Ionicons name="play" size={30} color="#eaeaea" />
                                ) : (
                                    <Foundation name="pause" size={30} color="#eaeaea" />
                                )}
                        </CameraButton>
                    )}
                    <CameraButton
                        onPress={togglePosition}
                    >
                        {isRightPosition?(
                        <View style={{ transform: [{ rotate: '180deg' }] }}>

                            <MaterialIcons name="flip" size={35} color="#eaeaea" />
                        </View>
                        ):
                        <MaterialIcons name="flip" size={35} color="#eaeaea" />
                        }
                    </CameraButton>
                    {/* <Text>{uri}</Text> */}
                    <DisplayMedia photoUri={photoUri} videoUri={videoUri} />
                   </View>
                </ShowMenuButton>
                </View>
                    {/* <TouchableOpacity title="Snap To 50%" onPress={() => handleSnapPress(1)} />
                    <TouchableOpacity title="Snap To 25%" onPress={() => handleSnapPress(0)} />
                    <TouchableOpacity title="Close" onPress={() => handleClosePress()} /> */}
                    <BottomSheet
                            ref={sheetRef}
                            index={1}
                            snapPoints={snapPoints}
                            onChange={handleSheetChange}
                            enablePanDownToClose={false}
                            handleIndicatorStyle={{backgroundColor:'#ffffff'}}
                            // handleIndicatorStyle={{display:'none'}}
                            backgroundStyle={{backgroundColor:'#F3E7E9', borderRadius: 25, opacity:5, }}
                            // backgroundStyle={{backgroundColor:'#1E2832', borderRadius: 25 }}
                            // backgroundStyle={{backgroundColor:'#1E2832', borderRadius: 25 }}
                            >
                            <LinearGradient
                            colors={['#F3E7E9', '#b0cfff']}
                            style={{
                              flex: 1,
                              borderRadius: 25,
                              // Add any additional styles here
                            }}
                          >
                           
                            {/* <View style={{ flex: 1 / 3 }} */}
                            {/* <View className="basis-1/3 bg-gray-700" > */}
                            <View className="flex-row my-5 px-5 w-full items-center justify-between">
                                <View className="flex flex-row items-center">
                                    {/* <TouchableOpacity onPress={() => toggleTab('aiResult')}> */}
                                    <Text className="text-gray-700 text-xl font-bold">AI channel</Text>
                                    {/* </TouchableOpacity> */}
                                    <NeonLight isWebSocketOpen={isWebSocketOpen}/>
                                </View>
                                {/* <Switch
                                    // Other props...
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={ isRightPosition ? "#ffffff" : "#f4f3f4"}
                                /> */}
                                    <View className="flex-row space-x-3 items-center mr-5">
                                    {/* {isRightPosition ?
                                        (<Octicons name={'sync'} size={24} color="#eaeaea" />)
                                        :
                                        (<MaterialCommunityIcons name={'sync-off'} size={24} color="#eaeaea" />)
                                    } */}
                                    {/* <MaterialIcons name={'video-camera-front'} size={25} color="#ffffff" /> */}
                                        <Switch
                                        // style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }]  }}
                                        value={isSync}
                                        onValueChange={toggleSync}
                                        trackColor={{ false: "#767577", true: "#e2c5ca" }}
                                        thumbColor={ isSync ? "#ffffff" : "#f4f3f4"}
                                        />
                                    </View>
                                <MusicButton color='#ffffff'/>
                                <SoundButton color='#ffffff'/>
                                        {/* <TouchableOpacity onPress={() => handleSnapPress(2)}> */}
                                <TouchableOpacity onPress={toggleSnapPoints}>
                                    <AntDesign name="youtube" size={30} color="#ff0000"/>
                                </TouchableOpacity>
                                {/* <View className="mr-5">
                                        <TouchableOpacity>
                                        <Octicons name="list-unordered" size={30} color="#ffffff"/>
                                        </TouchableOpacity>
                                </View> */}
                                    {/* <View className="mr-5">
                                    {selectedTab === 'aiResult' ? (
                                            <TouchableOpacity onPress={() => toggleTab('youtube')}>
                                            <AntDesign name="youtube" size={30} color="#d2d2d2"/>
                                            </TouchableOpacity>
                                    ) : (

                                            <TouchableOpacity onPress={() => toggleTab('aiResult')}>
                                            <Octicons name="list-unordered" size={30} color="#d2d2d2"/>
                                            </TouchableOpacity>
                                    )}
                                    </View> */}
                                {/* <ShowMenuButton/> */}
                                {/* <MaterialCommunityIcons name="theme-light-dark" size={35} color="#d2d2d2" /> */}
                            </View>
                        {/* { selectedTab === 'aiResult' ? ( */}

                        <BottomSheetScrollView >
                            {/* {data.map(renderItem)} */}
                        {/* { fullChecklistString && jsonData && <DisplayCheckedList fullChecklistString={fullChecklistString} jsonData={jsonData} videoId={videoId}/>} */}
                        { jsonData && <DisplayCheckedList fullChecklistString={fullChecklistString} jsonData={jsonData} videoId={videoId}/>}
                            </BottomSheetScrollView>
                        </LinearGradient>
                        </BottomSheet>
        </GestureHandlerRootView>
      </>
    );
}

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       paddingTop: 200,
//     },
//     contentContainer: {
//       backgroundColor: "white",
//     },
//     itemContainer: {
//       padding: 6,
//       margin: 6,
//       backgroundColor: "#eee",
//     },
//   });