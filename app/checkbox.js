// displayCheckbox.js
import React from 'react';
import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { useWebSocket } from '../util/useWebSocket';
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    Modal,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform 
} from 'react-native';
import { button } from '../style/NativeWind.js';
import Toast from 'react-native-toast-message';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MusicButton } from '../components/MusicButton';
import { SoundButton } from '../components/SoundButton';
import { Entypo,AntDesign,FontAwesome5,Feather,FontAwesome, Foundation,FontAwesome6,Ionicons,MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import { GradientText } from '../components/GradientText';
import { NeuButton } from '../components/neumorphsimButton';
import { LinearGradient } from 'expo-linear-gradient';
import  LottieView  from 'lottie-react-native';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
// import { BlurView } from 'expo-blur';
import YoutubePlayer from "react-native-youtube-iframe";
// import { Picker } from '@react-native-picker/picker';

export default function Checkbox() {
    // Access the route object to get the passed data
    
    // ***For Production ( comment out for development - 5 lines ):
    // const { responseData, videoId } = useLocalSearchParams();
    // console.log('responseData in Checkbox.jsx:', responseData);
    // console.log('videoId in Checkbox.jsx:', videoId);
        
    // console.log('parsedResponseData in Checkbox.jsx :', parsedResponseData);
    // const parsedResponseData = JSON.parse(responseData);
    // const checklist = parsedResponseData.checklist;

    // ***For Development ( comment out for production - 1 line ):
    const videoId = 'CzC3qngNEcA';
    // const checklist = [{"timestamp": "00:00:00", "objects": {"leeks": true, "knife": true, "cutting board": true, "bowl": true, "water": true, "paper towel": true}, "actions": {"place leeks on cutting board": true, "trim the root end of leeks": true, "remove the dark tops of leeks": true}}, {"timestamp": "00:33:00", "objects": {"leeks": true, "knife": true}, "actions": {"cut leeks into 4 inch sections": true, "slice leeks in half lengthwise": true}}, {"timestamp": "00:39:00", "objects": {"leeks": true, "bowl": true, "water": true}, "actions": {"place leek sections in bowl of water": true, "clean leeks in water": true, "check layers of leeks for hidden dirt": true}}, {"timestamp": "00:55:00", "objects": {"leeks": true, "knife": true, "bowl": true, "water": true, "paper towel": true}, "actions": {"slice leeks": true, "rinse leeks in bowl of water": true, "lift leeks out of bowl": true, "place leeks on paper towel": true, "store leeks in fridge": true}}]
    const checklist = [{"timestamp": "00:00:20", "actions": {"Trim the root end": true}}, {"timestamp": "00:00:25", "actions": {"Remove the dark tops": true}}, {"timestamp": "00:00:33", "actions": {"Cut the leek into sections": true}}, {"timestamp": "00:00:37", "actions": {"Slice the leek in half lengthwise": true}}, {"timestamp": "00:00:39", "actions": {"Clean the leek": true}}, {"timestamp": "00:00:55", "actions": {"Clean the leek after cutting": true}}, {"timestamp": "00:00:57", "actions": {"Slice the leek": true}}, {"timestamp": "00:01:03", "actions": {"Rinse the leek": true}}, {"timestamp": "00:01:07", "actions": {"Lift the leek": true}}]
    
    // log the checklist :
    console.log('checklist in Checkbox.jsx :', checklist);

    const [jsonData, setJsonData] = useState(checklist); // Added state for jsonData
    // const [objectInputValues, setObjectInputValues] = useState(['']);
    const [actionInputValues, setActionInputValues] = useState(['']);
    // const [objectItems, setObjectItems] = useState([]);
    const [actionItems, setActionItems] = useState([]);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const animation = useRef(null);

    const router = useRouter();
    const insets = useSafeAreaInsets();
    const isJsonData = true;
    const sheetRef = useRef(null);
    const playerRef = useRef();

    const { socket, isWebSocketOpen } = useWebSocket();
    // console.log('socket:', socket);
    console.log('isWebSocketOpen:', isWebSocketOpen);
    console.log('WebSocket readyState:', socket.readyState);

    useEffect(() => {
        if (isWebSocketOpen) {
            console.log('WebSocket connection opened successfully in checkbox screen');
        }
    }, [isWebSocketOpen]);

    useEffect(() => {
        if (!socket) return;

        // socket.on('connecst', () => {
        //     console.log('WebSocket connection opened successfully in cameraScreen');
        // });

        socket.on('error', error => {
            console.error('WebSocket error in checkbox screen:', error);
        });

        socket.on('disconnect', () => {
            console.log('WebSocket connection closed in checkbox screen');
        });

        return () => {
            socket.close();
        };
    }, [socket]);

    useEffect(() => {
        if (jsonData) {
            let allObjects = [];
            let allActions = [];

            jsonData.forEach(stepData => {
                // const objects = Object.keys(stepData.objects);
                const actions = Object.keys(stepData.actions);
                // allObjects = [...all Objects, ...objects];
                allActions = [...allActions, ...actions];
            });

            // setObjectItems(allObjects);
            setActionItems(allActions);
        }
    }, [jsonData]);

    if (jsonData === null) {
        return (
            <View>
                <Text className="text-white font-bold">
                    jsonData = null, Loading...
                </Text>
            </View>
        ); // or any other loading indicator
    }

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredChecklist, setFilteredChecklist] = useState(checklist);
    const [modalVisible, setModalVisible] = useState(false);

    function jumpToTimestamp(timestamp){
        console.log("time stamp button is toggled.");
        console.log("time stamp :", timestamp );
        // Convert the timestamp to seconds
        const [hours, minutes, seconds] = timestamp.split(':');
        const totalSeconds = parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
        console.log("totalSeconds :",totalSeconds);
    
        // Function to seek to a specific time in the video
        const seekToTime = (totalSeconds) => {
            // Check if playerRef is available
            if (playerRef.current) {
                // Seek to the specified time in seconds
                playerRef.current.seekTo(totalSeconds, true); // true allows seeking ahead
            }
        };

        seekToTime(totalSeconds);
    }

    // Function to filter checklist based on search query
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query === '') {
            setFilteredChecklist(checklist);
        } else {
            const filtered = checklist.filter(item => {
                const actions = Object.keys(item.actions).join(' ').toLowerCase();
                return actions.includes(query.toLowerCase());
            });
             // Update the step index in the title and inside TextInput
            const updatedFilteredChecklist = filtered.map((item, index) => ({
                ...item,
                stepIndex: index + 1, // Update the step index
            }));
            setFilteredChecklist(updatedFilteredChecklist);
            // setFilteredChecklist(filtered);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setFilteredChecklist(checklist);
    };

    const [searchQueryData, setSearchQueryData] = useState('');
    const [filteredData, setFilteredData] = useState(jsonData);

     // Set the initial data with index
     useEffect(() => {
        const dataWithIndex = jsonData.map((item, index) => ({
            ...item,
            originalIndex: index + 1 // Store the original index
        }));
        setFilteredData(dataWithIndex);
    }, [jsonData]);

    const handleSearchData = (query) => {
        setSearchQueryData(query);
        if (query === '') {
            setFilteredData(jsonData.map((item, index) => ({
                ...item,
                originalIndex: index + 1
            })));
        } else {
            const filtered = jsonData
                .map((item, index) => ({
                    ...item,
                    originalIndex: index + 1 // Preserve the original index
                }))
                .filter(item => {
                    const actions = Object.keys(item.actions).join(' ').toLowerCase();
                    return actions.includes(query.toLowerCase()) || item.timestamp.includes(query);
                });
            setFilteredData(filtered);
        }
    };

    const clearSearchData = () => {
        setSearchQueryData('');
        setFilteredData(jsonData.map((item, index) => ({
            ...item,
            originalIndex: index + 1
        })));
    };
    const handleBookMark = () => {
        setIsBookmarked(!isBookmarked);
      };

    useEffect(() => {
        if (isBookmarked) {
          animation.current.play(0, 100); // Play from start to end
        } else {
          animation.current.play(100, 0); // Play in reverse from end to start
        // setProgress(0); // Set progress to 0 (empty)
        }
    }, [isBookmarked]);

    const [visibleBottomSheet, setVisibleBottomSheet] = useState(false);
    const snapPoints = useMemo(() => ["40%","45%","70%","90%"], []);
  
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

    const toggleBottomSheet = () => {
        if (snapState === 3) {
          // If BottomSheet is fully open, close it
          sheetRef.current?.close();
          setSnapState(-1); // Set state to -1 (closed)
        } else {
          // If BottomSheet is not fully open, open it
          setSnapState(3);
          sheetRef.current?.snapToIndex(3);
        }
      };       

      const toggleSnapPoints = () => {
        const newState = snapState === 2 ? 1 : 2; // Toggle between 0 and 1
        setSnapState(newState);
        handleSnapPress(newState);
    };
      
    const [searchQueryBottomSheet, setSearchQueryBottomSheet] = useState('');
    const [filteredDataBottomSheet, setFilteredDataBottomSheet] = useState([]);
    const [stepFilter, setStepFilter] = useState('');
    const [editActionText, setEditActionText] = useState('');
    const [editItem, setEditItem] = useState(null);

     const handleSearchDataBottomSheet = (query) => {
        setSearchQueryBottomSheet(query);
        if (query === '') {
            setFilteredDataBottomSheet(jsonData.map((item, index) => ({
                ...item,
                originalIndex: index + 1
            })));
        } else {
            const filtered = jsonData
                .map((item, index) => ({
                    ...item,
                    originalIndex: index + 1 // Preserve the original index
                }))
                .filter(item => {
                    const actions = Object.keys(item.actions).join(' ').toLowerCase();
                    return actions.includes(query.toLowerCase()) || item.timestamp.includes(query);
                });
            setFilteredDataBottomSheet(filtered);
        }
    };

    const clearSearchDataBottomSheet = () => {
        setSearchQueryBottomSheet('');
        setFilteredDataBottomSheet(jsonData.map((item, index) => ({
            ...item,
            originalIndex: index + 1
        })));
    };

    const resetChecklist = () => {
        setJsonData(checklist);
        const dataWithIndex = checklist.map((item, index) => ({
            ...item,
            originalIndex: index + 1
        }));
        setFilteredData(dataWithIndex);
        setFilteredDataBottomSheet(dataWithIndex);
        setSearchQueryData('');
        setSearchQueryBottomSheet('');
        setStepFilter('');
    };

    const handleStepFilter = (step) => {
        if (step === '') {
            setFilteredDataBottomSheet(jsonData.map((item, index) => ({
                ...item,
                originalIndex: index + 1
            })));
        } else {
            const stepIndex = parseInt(step, 10) - 1;
            setFilteredDataBottomSheet([{
                ...jsonData[stepIndex],
                originalIndex: stepIndex + 1
            }]);
        }
    };

    const handleEditAction = (item) => {
        setEditActionText(Object.keys(item.actions)[0]);
        setEditItem(item);
        setModalVisible(true);
    };

    const saveEditAction = () => {
        const updatedData = jsonData.map(data => {
            if (data.timestamp === editItem.timestamp) {
                return {
                    ...data,
                    actions: { [editActionText]: true }
                };
            }
            return data;
        });
        setJsonData(updatedData);
        const dataWithIndex = updatedData.map((item, index) => ({
            ...item,
            originalIndex: index + 1
        }));
        setFilteredData(dataWithIndex);
        setFilteredDataBottomSheet(dataWithIndex);
        setModalVisible(false);
    };

    const removeAction = (timestamp) => {
        const updatedData = jsonData.filter(item => item.timestamp !== timestamp);
        setJsonData(updatedData);
        const dataWithIndex = updatedData.map((item, index) => ({
            ...item,
            originalIndex: index + 1
        }));
        setFilteredData(dataWithIndex);
        setFilteredDataBottomSheet(dataWithIndex);
    };

    const renderItem = ({ item }) => (
        <View key={item.originalIndex}>
            <TouchableOpacity onPress={() => jumpToTimestamp(item.timestamp)}>
                <Text className="text-md text-gray-400">{item.timestamp}</Text>
            </TouchableOpacity>
            {Object.keys(item.actions).map((action, idx) => (
                <View key={idx} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text className="text-lg font-bold text-purple-400">
                        {item.originalIndex}.{idx + 1} {action}
                    </Text>
                    <TouchableOpacity onPress={() => handleEditAction(item)}>
                        <Ionicons name="pencil" size={20} color="#d2d2d2" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeAction(item.timestamp)}>
                        <Ionicons name="remove-circle" size={20} color="#d2d2d2" />
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );

    // Function to navigate to CameraScreen with jsonData
    const navigateToCameraScreen = () => {
        console.log('Submit button pressed');
        if (socket) {
            // Send jsonData to Socket.IO server
            socket.emit('jsonData', jsonData);
            console.log("JSON data on submit button:", jsonData);
        }
        console.log("isJsonData :", isJsonData);
        // router.push({ pathname: "/cameraScreen"});
        router.push({ pathname: "/cameraScreen", params: { isJsonData: JSON.stringify(isJsonData), jsonData: JSON.stringify(jsonData), videoId : videoId } });
    };

    console.log('jsonData in Checkbox component before rendering :', jsonData);

    return (
        <>
        <GestureHandlerRootView style={{ flex: 1 }}>
                {/* <LinearGradient
                    colors={['#F3E7E9', '#b0cfff']}
                    style={{ flex: 1, borderRadius: 25 }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                > */}
                    <View
                        style={{
                            paddingTop: insets.top,
                            paddingRight: insets.right,
                        }}
                    />
                    <View className="flex-row justify-between items-center w-full pb-2 px-7">
                        <View className="flex-row justify-start items-center space-x-2 pr-3 flex-1">
                            <Ionicons name="search" size={25} color="#d2d2d2" />
                            <TextInput
                                style={{ 
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#d2d2d2",
                                    // borderBottomColor: "#de9de0",
                                    padding: 10,
                                    fontSize: 16,
                                    flex: 1 // Allow the TextInput to take available space
                                }}
                                placeholder="Search actions..."
                                value={searchQueryData}
                                onChangeText={handleSearchData}
                            />
                            { searchQueryData ? (
                                <TouchableOpacity onPress={clearSearchData}>
                                    <Ionicons name="close-circle" size={25} color="#d2d2d2" />
                                </TouchableOpacity>
                            ) : null}
                        </View>
                        <View className="flex-row justify-end items-center space-x-0">
                            <TouchableOpacity>
                                <LottieView
                                    autoPlay
                                    style={{ width: 25, height: 25 }}
                                    source={require('../assets/share.json')}
                                    loop={true}
                                    colorFilters={[
                                        {
                                          keypath: 'Layer 1',
                                          color: '#d2d2d2',
                                        },
                                        {
                                          keypath: 'Layer 2',
                                          color: '#d2d2d2',
                                        },
                                        {
                                          keypath: 'Layer 3',
                                          color: '#d2d2d2',
                                        },
                                      ]}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleBookMark}>
                                <LottieView
                                    ref={animation}
                                    style={{ width: 40, height: 40 }}
                                    source={require('../assets/bookmark.json')}
                                    progress={isBookmarked ? 1 : 0 }
                                    loop={false}
                                    // colorFilters={[{
                                    //     keypath: "Null 1","Bookmark Outline","Bookmark Fill","Circle"
                                    //     color: isBookmarked ? "#d373d2" : "#de9de0",
                                    // }]}
                                />
                            </TouchableOpacity>
                            {/* <TouchableOpacity className="pr-2" onPress={toggleBottomSheet}>
                                <AntDesign name="youtube" size={25} color="#ff0000"/>
                            </TouchableOpacity> */}
                            <View className="pr-2">
                               {/* <Foundation name="dollar" size={30} color="#d2d2d2"/> */}
                               <TouchableOpacity onPress={handleBookMark}>
                               <LottieView
                                    autoPlay
                                    style={{ width: 35, height: 35 }}
                                    source={require('../assets/dollar.json')}
                                    loop={true}
                                    speed={0.4}
                                    // colorFilters={[
                                    //     {
                                    //       keypath: 'Layer 1',
                                    //       color: '#d2d2d2',
                                    //     },
                                    //     {
                                    //       keypath: 'Layer 2',
                                    //       color: '#d2d2d2',
                                    //     },
                                    //     {
                                    //       keypath: 'Layer 3',
                                    //       color: '#d2d2d2',
                                    //     },
                                    //   ]}
                                />
                                
                            </TouchableOpacity>
                            </View>
                            {/* <MaterialIcons name="settings-suggest" size={30} color="#d2d2d2"/> */}
                            <FontAwesome6 name="circle-user" size={30} color="#d2d2d2"/>
                        </View>
                    </View>
                    
                    <Text className="text-gray-400 px-10 pb-4">Prior to proceeding with detection, kindly review and confirm the provided instructions below.</Text>
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View className="px-10" key={item.originalIndex}>
                                <TouchableOpacity onPress={() => jumpToTimestamp(item.timestamp)}>
                                    <Text className="text-md text-gray-400">{item.timestamp}</Text>
                                </TouchableOpacity>
                                {Object.keys(item.actions).map((action, idx) => (
                                    <Text className="text-lg font-bold text-purple-400" key={idx}>
                                        {item.originalIndex}. {action}
                                    </Text>
                                ))}
                            </View>)}
                    />
                {videoId && 
                    <YoutubePlayer
                        ref={playerRef}
                        height={220}
                        videoId={videoId}
                    />
                }
                <Text className="text-xs text-gray-400 pt-2 px-5">Tap on the timestamp to navigate to that section of the video. Tap on the title of the video to open it in the Youtube App.</Text>

                    <View className="px-7 pt-1 pb-5 w-full bg-gray-100/80 flex-row justify-between">
                       
                        <NeuButton height={50} width={150} onPress={toggleBottomSheet}>
                            <Text className="text-gray-400 text-lg font-semibold">Edit</Text>
                        </NeuButton>
                        <NeuButton height={50} width={150} onPress={navigateToCameraScreen}>
                            <Text className="text-gray-400 text-lg font-semibold">Submit</Text>
                        </NeuButton>
                    </View>
                    <BottomSheet
                        ref={sheetRef}
                        index={-1} //initially hide the bottomsheet by using -1
                        snapPoints={snapPoints}
                        onChange={handleSheetChange}
                        enablePanDownToClose={true}
                        handleIndicatorStyle={{backgroundColor:'#de9de0'}}
                        // handleIndicatorStyle={{display:'none'}}
                        // backgroundStyle={{backgroundColor: 'transparent', borderRadius: 25 }}
                        backgroundStyle={{backgroundColor: '#ffffff', borderRadius: 25, opacity: 1, overflow:'hidden'}}
                    >
                        {/* <BlurView intensity={90} tint="light" style={{ flex: 1, position:'absolute', width:'100%', height:'100%' }}> */}
                        {/* <View className="pb-10"> */}
                        <View className="flex-1">
                        <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        // keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust this value as needed
                        >
                         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ width: '90%', backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
                        <View className="flex-row justify-start items-center space-x-2">
                            <Ionicons name="search" size={25} color="#d2d2d2" />
                            <TextInput
                                style={{ 
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#d2d2d2",
                                    padding: 10,
                                    fontSize: 16,
                                    flex: 1
                                }}
                                placeholder="Search actions..."
                                value={searchQueryBottomSheet}
                                onChangeText={handleSearchDataBottomSheet}
                            />
                            { searchQueryBottomSheet ? (
                                <TouchableOpacity onPress={clearSearchDataBottomSheet}>
                                    <Ionicons name="close-circle" size={25} color="#d2d2d2" />
                                </TouchableOpacity>
                            ) : null}
                        </View>

                        {/* <View style={{ marginVertical: 10 }}>
                            <Text>Step:</Text>
                            <Picker
                                selectedValue={stepFilter}
                                onValueChange={(itemValue) => handleStepFilter(itemValue)}
                            >
                                <Picker.Item label="Select step" value="" />
                                {jsonData.map((item, index) => (
                                    <Picker.Item key={index} label={`${index + 1}`} value={`${index + 1}`} />
                                ))}
                            </Picker>
                        </View> */}

                        <FlatList
                            data={filteredDataBottomSheet}
                            keyExtractor={(item) => item.originalIndex.toString()}
                            renderItem={renderItem}
                        />

                        <View style={{ marginTop: 20 }}>
                            <Button title="Reset" onPress={resetChecklist} />
                            <Button title="Close" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </View>

         
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ width: '90%', backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
                        <TextInput
                            style={{ 
                                borderWidth: 1,
                                borderColor: "#d2d2d2",
                                padding: 10,
                                fontSize: 16,
                                flex: 1
                            }}
                            value={editActionText}
                            onChangeText={setEditActionText}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <Button title="Save" onPress={saveEditAction} />
                            <Button title="Cancel" onPress={() => setEditItem(null)} />
                        </View>
                    </View>
                </View>
                       
                        </KeyboardAvoidingView>
                        <View className="px-10">
                            <NeuButton height={50} width='100%' onPress={resetChecklist}>
                                <Text className="text-gray-400 text-lg font-semi-bold">Reset</Text>
                            </NeuButton>
                        </View>
                    </View>
                        {/* </BottomSheetScrollView> */}
                        
                        <View className="justify-center items-center pb-10">
                            <Text className="text-gray-300">Swipe All Down to Dismiss</Text>
                        </View>
                    {/* </View> */}
                    {/* </BlurView> */}
                    </BottomSheet>
            
                {/* </LinearGradient> */}
        </GestureHandlerRootView>
        </>
    );
    
    }

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        borderColor: '#d2d2d2',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
});