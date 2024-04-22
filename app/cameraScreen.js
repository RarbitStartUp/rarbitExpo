import React, { useEffect, useRef, useState } from 'react';
import Toast from 'react-native-toast-message';
import { View, Text, TouchableOpacity, Linking, Pressable } from 'react-native';
// import { useRoute } from '@react-navigation/native';
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';
import {
    Camera,
    useCameraPermission,
    // useMicrophonePermission,
    useCameraDevice,
    useFrameProcessor,
    // useResizePlugin,
} from 'react-native-vision-camera';
import { useWebSocket } from '../util/useWebSocket';
// import {detectObjects} from 'vision-camera-realtime-object-detection';
// import {
//   DetectedObject,
//   detectObjects,
//   FrameProcessorConfig,
// } from 'vision-camera-realtime-object-detection';
// import { useTensorflowModel } from "react-native-fast-tflite";
import { DisplayCheckedList } from '../components/DisplayCheckedList';
import { useResizePlugin } from 'vision-camera-resize-plugin';
// import { Worklets as TWorklets, useRunInJS } from 'react-native-worklets-core';
// import { runOnJS } from 'react-native-reanimated';
// import { CameraRoll } from "@react-native-camera-roll/camera-roll";

export default function CameraScreen() {
    const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
    const socket = useWebSocket();
    // Access the route object to get the passed data
    // const { jsonData } = useLocalSearchParams();
    const jsonData = [{"timestamp":"00:00:02","objects":{"leek":true,"knife":true,"cutting board":true},"actions":{"cut":true}},{"timestamp":"00:00:10","objects":{"leek":true,"water":true,"bowl":true},"actions":{"wash":true}},{"timestamp":"00:00:38","objects":{"leek":true,"paper towel":true},"actions":{"dry":true}},{"timestamp":"00:00:43","objects":{"leek":true,"knife":true,"cutting board":true},"actions":{"cut":true}},{"timestamp":"00:01:03","objects":{"leek":true,"bowl":true},"actions":{"store":true}}]
    //   const route = useRoute();
    console.log('jsonData in cameraScreen.js:', jsonData);

// Check if Worklets are enabled
// const workletsEnabled = typeof TWorklets;
// const workletsEnabled = typeof TWorklets !== 'undefined';
// console.log("workletsEnabled:", workletsEnabled); 

// Extract createRunOnJS from TWorklets
// const { useRunInJS } = TWorklets;
// const { createRunOnJS } = TWorklets;
// Convert the function to a string using toString() and log it
// console.log("useRunInJS:", useRunInJS);
// console.log("useRunInJS:", useRunInJS.toString());
// console.log("runOnJS:", runOnJS);
// console.log("runOnJS:", runOnJS.toString());
// console.log("createRunOnJS:", createRunOnJS);
// console.log("createRunOnJS:", createRunOnJS.toString());

// Now you can use workletsEnabled to track if Worklets are enabled and show it on the UI

    const camera =useRef(null);
    const onTakePicture = async() =>{
    const photo = await camera.current?.takePhoto({
            flash: 'auto'
        });
        console.log("photo:",photo);
//         await CameraRoll.save(`file://${photo.path}`, {
//         type: 'photo',
// }
    }
    // console.log('responseData in Checkbox.jsx:', JSON.stringify(responseData, null, 2));
    // Object.entries(responseData).forEach(([key, value]) => {
    //     console.log(`${key}:`, value);
    // });
    // const route = useRoute();
    // console.log('route in CameraScreen.jsx:', route);
    // const jsonData = route.params.jsonData;
    // console.log('jsonData in CameraScreen.jsx :', jsonData);

    // const [hasPermission, setHasPermission] = useState(false)
    const { hasPermission, requestPermission } = useCameraPermission();
    // const {hasPermission,requestPermission} = useMicrophonePermission();
    const device = useCameraDevice('back');
    // const [selectedCamera, setSelectedCamera] = useState(null);
    // const toggleCamera = () => {
    //     setSelectedCamera(prevCamera => (prevCamera === 'front' ? 'back' : 'front'));
    // };

    // const device = useCameraDevice(selectedCamera);
    // const devices = useCameraDevices('wide-angle-camera')
    // const device = devices.front;
    const [isSendingFrames, setIsSendingFrames] = useState(false); // State to track if frames are being sent
    // const frameProcessorConfig = {
    //   modelFile: 'SSD_MobileNet_V2_FPNLite_640x640.tflite', // <!-- name and extension of your model
    //   scoreThreshold: 0.5,
    // };
    // const [model, setModel] = useState(null);
    const [fullChecklistString, setFullChecklistString] = useState(null);

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

    const { resize } = useResizePlugin();

    // useEffect(() => {
    //     Camera.requestCameraPermission().then((p) =>
    //         setHasPermission(p === 'granted')
    //     )
    // }, [])
    useEffect(() => {
        if (!hasPermission) {
            // If the user hasn't granted camera permission yet, request it
            requestPermission();
        }
    }, [hasPermission, requestPermission]);

    // useEffect(() => {
    //     async function getPermission() {
    //       const permission = await Camera.requestCameraPermission();
    //       console.log(`Camera permission status: ${permission}`);
    //       if (permission === 'denied') await Linking.openSettings();
    //     }
    //     getPermission();
    //   }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on('connect', () => {
            setIsWebSocketOpen(true);
            console.log('WebSocket connection opened successfully in uploadVideo Screen');
        });

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
            console.error('WebSocket error in uploadVideo Screen:', error);
        });

        socket.on('disconnect', () => {
            setIsWebSocketOpen(false);
            console.log('WebSocket connection closed in uploadVideo Screen');
        });

        return () => {
            socket.close();
        };
    }, [socket]);

    // Function to handle WebSocket operations
// const handleWebSocket = useRunInJS((frameData, jsonData) =>{
// // const handleWebSocket = Worklets.createRunOnJS((frameData, jsonData) =>{
//     // Perform WebSocket operations here, such as establishing a connection and sending data
//     // Replace the following lines with your WebSocket code
//     // Send frames to WebSocket
//                         // if (socket) {
//                         //     // Send frameMessage to Socket.IO server
//                         //     socket.emit('frame', frame);
//                         //     // Send jsonData to Socket.IO server
//                         //     socket.emit('jsonData', jsonData);
//                         // }
//     console.log("Start sending frames via WebSocket");
//     console.log("Frame data:", frameData);
//     console.log("JSON data:", jsonData);
//   },);
  
// const handleWS = (frameData, jsonData) =>{
//     console.log("Start sending frames via WebSocket");
//     console.log("Frame data:", frameData);
//     console.log("JSON data:", jsonData);
// };

    // Define frame processing function using useFrameProcessor hook
    const frameProcessor = useFrameProcessor((frame) => {
        'worklet'
        if (isSendingFrames) {
            console.log(`Frame: ${frame.width}x${frame.height} (${frame.pixelFormat})`)
            console.log("isSendingFrames turns true now, the toggle button is clicked.")
            if (jsonData && jsonData.length > 0) {
                console.log("jsonData is present.")
                try {
                    console.log("start sending frames via websocket.")
                    // Call the handleWebSocket function from the main thread using runOnJS
                    // handleWebSocket(frame, jsonData);
                    // runOnJS(handleWS)(frame, jsonData);
                }catch (error) {
                    console.error(
                        'Error while processing frame or sending data to WebSocket:',
                        error,
                    );
                }
            }
        }
      }, [isSendingFrames])

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
        console.log("toggle button is clicked.")
        console.log("isWebSocketOpen inside toggle button:", isWebSocketOpen);
        // if (!isWebSocketOpen) {
        //     // Show alert if WebSocket is not open
        //     Toast.show('Wait for awhile to connect...', Toast.SHORT);
        //     return;
        // }
        // setIsSendingFrames(prevState => !prevState); // Toggle the state
        // setIsSendingFrames(prevState => {
        //     console.log("Previous isSendingFrames state:", prevState);
        //     return !prevState; // Toggle the state
        // });
        const newIsSendingFramesState = !isSendingFrames; // Calculate the new state value
        console.log("New isSendingFrames state:", newIsSendingFramesState); // Log the new state value
        setIsSendingFrames(newIsSendingFramesState); // Update the state
    };

    console.log("isSendingFrames :", isSendingFrames);
    console.log("isWebSocketOpen :", isWebSocketOpen);
    // Determine the connection status based on the socket
    const connectionStatus = socket ? 'Exist' : 'Not Exist';
    console.log("connectionStatus:",connectionStatus);

    return (
        // <View className="flex-2/3 bg-black">
        <View style={{ flex: 1 }}>
            {/* <View style={{ flex: 1 / 2 }}>
                <Text>Selected Camera: {selectedCamera}</Text>
                <TouchableOpacity onPress={toggleCamera}>
                    <Text>Toggle Camera</Text>
                </TouchableOpacity>
            </View> */}
            {device ? (
                // <View className="flex-4/5">
                <View style={{ flex: 1 }}>
                    <Camera
                        ref={camera}
                        style={{ flex: 1 }}
                        device={device}
                        isActive={true}
                        video={true}
                        photo={true}
                        // audio={true}
                        // frameProcessorFps={5}
                        frameProcessor={frameProcessor}
                    />
                    <View className="absolute top-0 left-0 right-0 p-4">
                        <Text className="text-white">Camera Screen</Text>
                        {/* Button to toggle sending frames */}
                        <Pressable 
                            onPress={onTakePicture}
                            style={{
                                position:"absolute",
                                alignSelf:"center",
                                top:100,
                                width:75,
                                height:75,
                                backgroundColor:"white",
                                borderRadius:75,
                        }}/>
                        <TouchableOpacity
                            onPress={toggleSendingFrames}
                            className="bg-blue-500 rounded-md p-4 mt-4">
                            <Text className="text-white text-center">
                                {isSendingFrames ? 'Stop Detecting' : 'Start Detecting'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View className="flex-1/3"> */}
                    <View style={{ flex: 1 / 3 }}>
                        <Text className="text-black">Detection Result here :</Text>
                        {/* <Text>WebSocket Status: {socket && socket.readyState === WebSocket.OPEN ? 'Open' : 'Closed'}</Text> */}
                        <Text>Socket.IO Status: {connectionStatus}</Text>
                        <Text>isWebSocketOpen Status: {isWebSocketOpen}</Text>
                        {fullChecklistString && <DisplayCheckedList fullChecklistString={fullChecklistString} />}
                    </View>
                </View>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Camera not available</Text>
                </View>
            )}
        </View>
    );
}
