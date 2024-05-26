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
import { Entypo,AntDesign,FontAwesome5,Feather,FontAwesome,FontAwesome6,Ionicons,MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import { GradientText } from '../components/GradientText';
import { NeuButton } from '../components/neumorphsimButton';
import { LinearGradient } from 'expo-linear-gradient';
import  LottieView  from 'lottie-react-native';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';

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
    const checklist = [{"timestamp": "00:20", "actions": {"Trim the root end": true}}, {"timestamp": "00:25", "actions": {"Remove the dark tops": true}}, {"timestamp": "00:33", "actions": {"Cut the leek into sections": true}}, {"timestamp": "00:37", "actions": {"Slice the leek in half lengthwise": true}}, {"timestamp": "00:39", "actions": {"Clean the leek": true}}, {"timestamp": "00:55", "actions": {"Clean the leek after cutting": true}}, {"timestamp": "00:57", "actions": {"Slice the leek": true}}, {"timestamp": "01:03", "actions": {"Rinse the leek": true}}, {"timestamp": "01:07", "actions": {"Lift the leek": true}}]
    
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

     // Function to handle search and close modal
     const handleSearchAndCloseModal = (query) => {
        handleSearch(query);
        setModalVisible(false);
    };

    const [progress, setProgress] = useState(50);

    const handleBookMark = () => {
        setIsBookmarked(!isBookmarked);
      };

    useEffect(() => {
        if (isBookmarked) {
          animation.current.play(0, 50); // Play from start to end
        } else {
        //   animation.current.play(100, 50); // Play in reverse from end to start
        setProgress(0); // Set progress to 0 (empty)
        }
    }, [isBookmarked]);

    const [visibleBottomSheet, setVisibleBottomSheet] = useState(false);
    const snapPoints = useMemo(() => ["20%","50%","86%"], []);
  
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
  
    // const toggleSnapPoints = () => {
    //     const newState = snapState === (2 || !0) ? 1 : 2; // Toggle between 0 and 1
    //     setSnapState(newState);
    //     handleSnapPress(newState);
    // };

    const toggleBottomSheet = () => {
        if (snapState === 2) {
          // If BottomSheet is fully open, close it
          sheetRef.current?.close();
          setSnapState(-1); // Set state to -1 (closed)
        } else {
          // If BottomSheet is not fully open, open it
          setSnapState(2);
          sheetRef.current?.snapToIndex(2);
        }
      };      

    // useEffect(() => {
    //     let frame = isBookmarked ? 0 : 100;
    
    //     const animate = () => {
    //       if (isBookmarked && frame <= 100) {
    //         setProgress(frame / 100);
    //         frame++;
    //       } else if (!isBookmarked && frame >= 0) {
    //         setProgress(frame / 100);
    //         frame--;
    //       } else {
    //         return;
    //       }
    //       requestAnimationFrame(animate);
    //     };
    
    //     animate();
    //   }, [isBookmarked]);

    const removeNewItem = (listId, item, stepIndex) => {
        try {
            console.log('Remove button clicked');
            console.log('listId:', listId);
            console.log('item:', item);
            console.log('stepIndex:', stepIndex);

            // Update the state to remove the item from objectItems and actionItems
            if (listId === 'objectList') {
                setObjectItems(prevObjectItems =>
                    prevObjectItems.filter(obj => obj !== item)
                );
            } else if (listId === 'actionList') {
                setActionItems(prevActionItems =>
                    prevActionItems.filter(act => act !== item)
                );
            } else {
                throw new Error(`Invalid listId: ${listId}`);
            }

            // Update the jsonData state to reflect the removal
            setJsonData(prevData => {
                const newData = [...prevData];
                const updatedStepData = { ...newData[stepIndex] };

                // Determine the type based on the listId
                const type = listId === 'objectList' ? 'objects' : 'actions';
                // Remove the item from the checklist
                delete updatedStepData[type][item];

                newData[stepIndex] = updatedStepData;
                return newData;
            });
        } catch (error) {
            console.error('Error removing item:', error);
            Toast.show('Error removing item. Please try again.');
        }
    };

    // const resetChecklist = () => {
    //     console.log('Reset button pressed');
    //     try {
    //         console.log('jsonData before reset:', jsonData);
    //         // console.log('initialJsonData before reset:', initialJsonData);
    //         // Reset jsonData to its original state
    //         setJsonData(checklist);
    //         console.log('jsonData after reset:', jsonData);
    //         // console.log('initialJsonData after reset:', initialJsonData);

    //         // Reset objectItems and actionItems
    //         // let allObjects = [];
    //         let allActions = [];

    //         checklist.forEach(stepData => {
    //             // const objects = Object.keys(stepData.objects);
    //             const actions = Object.keys(stepData.actions);
    //             // allObjects = [...allObjects, ...objects];
    //             allActions = [...allActions, ...actions];
    //         });

    //         // setObjectItems(allObjects);
    //         // console.log('objectItems after reset:', allObjects);
    //         setActionItems(allActions);
    //         console.log('actionItems after reset:', allActions);
    //         console.log('jsonData after reset at the bottom:', jsonData);
    //     } catch (error) {
    //         console.error('Error resetting checklist:', error);
    //         Toast.show('Error resetting checklist. Please try again.');
    //     }
    // };

    const resetChecklist = () => {
        // const resetChecklist = filteredChecklist.map(item => ({
        //     ...item,
        //     actions: {}
        // }));
        setFilteredChecklist(checklist);
        setJsonData(checklist);
        setActionInputValues(Array(filteredChecklist.length).fill(''));
    };

    // Function to add an item to a specific step
    const addItemToStep = (listId, inputId, stepIndex) => {
        try {
            const newItem = listId === 'objectList' ? objectInputValues[stepIndex] : actionInputValues[stepIndex];

            if (!newItem) {
                Toast.show('Please enter a valid item.');
                return;
            }

            setActionInputValues(prevValues => {
                const newValues = [...prevValues];
                newValues[stepIndex] = ''; // Clear the input value for the current step
                return newValues;
            });

            // Clear the input value after adding the new item
            // if (listId === 'objectList') {
            //     setObjectInputValues(prevValues => {
            //         const newValues = [...prevValues];
            //         newValues[stepIndex] = ''; // Clear the input value for the current step
            //         return newValues;
            //     });
            // } else if (listId === 'actionList') {
            //     setActionInputValues(prevValues => {
            //         const newValues = [...prevValues];
            //         newValues[stepIndex] = ''; // Clear the input value for the current step
            //         return newValues;
            //     });
            // }

            setJsonData(prevData => {
                const newData = [...prevData];
                const updatedStepData = { ...newData[stepIndex] };

                // Add the new item to the appropriate checklist (objects or actions)
                if (inputId.includes('newObjectInput')) {
                    updatedStepData.objects[newItem] = true;
                } else if (inputId.includes('newActionInput')) {
                    updatedStepData.actions[newItem] = true;
                }

                // Update the step data with the modified checklist
                newData[stepIndex] = updatedStepData;
                return newData;
            });
        } catch (error) {
            console.error('Error adding new items:', error);
            Toast.show('Error adding new items. Please try again.');
        }
    };

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
                <LinearGradient
                    colors={['#F3E7E9', '#b0cfff']}
                    style={{ flex: 1, borderRadius: 25 }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View
                        style={{
                            paddingTop: insets.top,
                            paddingRight: insets.right,
                        }}
                    />
                    <View className="flex-row justify-between items-center w-full pb-5 px-7">
                        <View className="flex-row justify-start items-center space-x-2 pr-3 flex-1">
                            <Ionicons name="search" size={25} color="#de9de0" />
                            <TextInput
                                style={{ 
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#de9de0",
                                    padding: 10,
                                    fontSize: 16,
                                    flex: 1 // Allow the TextInput to take available space
                                }}
                                placeholder="Search actions..."
                                value={searchQuery}
                                onChangeText={handleSearch}
                            />
                        </View>
                        <View className="flex-row justify-end items-center space-x-2">
                            <TouchableOpacity>
                                <LottieView
                                    autoPlay
                                    style={{ width: 30, height: 30 }}
                                    source={require('../assets/share.json')}
                                    loop={true}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleBottomSheet}>
                                <FontAwesome name="file-text-o" size={25} color="#de9de0"/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleBookMark}>
                                <LottieView
                                    ref={animation}
                                    style={{ width: 40, height: 40 }}
                                    source={require('../assets/bookmark.json')}
                                    progress={isBookmarked ? 1 : 0 }
                                    loop={false}
                                    colorFilters={[{
                                        keypath: "Outline",
                                        color: isBookmarked ? "#d373d2" : "#de9de0",
                                    }]}
                                />
                            </TouchableOpacity>
                            <FontAwesome6 name="circle-user" size={35} color="#de9de0"/>
                        </View>
                    </View>
                    <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                // keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust this value as needed
            >
                    <View className="flex-1">
                        <FlatList
                            data={filteredChecklist}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <View key={index + 1}>
                                    <View className="flex flex-col w-full space-y-5 px-8 justify-between items-start">
                                        <View className="flex flex-row w-full justify-between items-center">
                                            <View className="flex-start">
                                                <Text className="text-2xl font-bold text-purple-400">Step {index + 1} :</Text>
                                            </View>
                                            <View className="flex-end">
                                                <View className="flex flex-row w-full space-x-2 items-center">
                                                    <Text className="text-lg font-semibold text-gray-400">{item.timestamp}</Text>
                                                    <MaterialIcons name="access-time" size={20} color="#939393" />
                                                </View>
                                            </View>
                                        </View>
                                        <View className="flex flex-col space-y-5 mb-1">
                                            <View className="flex flex-col justify-between space-y-5 mb-10 bg-gray-100/60 rounded-xl drop-shadow-xl p-5">
                                                {Object.keys(item.actions).map((actionKey, actIndex) => (
                                                    <View key={actIndex} className="flex-row justify-between w-full items-center space-x-3">
                                                        <View className="flex-1 flex-row flex-start">
                                                            <Text className="text-lg font-semibold">
                                                                {actIndex + 1}.
                                                            </Text>
                                                            <Text style={{ flex: 1, paddingLeft: 10 }} className="text-lg font-semibold">
                                                                {actionKey}
                                                            </Text>
                                                        </View>
                                                        <TouchableOpacity
                                                            onPress={() => removeNewItem('actionList', actionKey, index)}
                                                        >
                                                            <Ionicons name="remove" size={20} color="#939393" />
                                                        </TouchableOpacity>
                                                    </View>
                                                ))}
                                                <View className="flex flex-row justify-between w-full items-center">
                                                    <View className="flex-1"> 
                                                        <TextInput
                                                            value={actionInputValues[index]}
                                                            onChangeText={text => {
                                                                // Capitalize the first letter and convert the rest to lowercase
                                                                const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
                                                                // const lowerCaseText = text.toLowerCase(); // Convert text to lowercase
                                                                const newValues = [...actionInputValues];
                                                                // newValues[index] = lowerCaseText;
                                                                newValues[index] = capitalizedText;
                                                                setActionInputValues(newValues);
                                                            }}
                                                            className="pl-5 text-lg mr-10"
                                                            placeholder={`Add new action for Step ${index + 1}`}
                                                            multiline={true} // Enable multiline support
                                                            textAlignVertical="top" // Align text to the top for multiline input
                                                        />
                                                    </View>
                                                    <TouchableOpacity
                                                        onPress={() =>
                                                            addItemToStep(
                                                                'actionList',
                                                                `newActionInput${index}`,
                                                                index // Pass index of the step
                                                            )
                                                        }
                                                    >
                                                        <FontAwesome6 name="add" size={20} color="#939393" />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            // ListFooterComponent={<View className="pb-5" />} // Add some padding at the bottom
                            // contentContainerStyle={{ paddingBottom: 10 }} // Add some padding at the bottom
                        />
                    </View>
                </KeyboardAvoidingView>
                    <View className="px-7 py-5 w-full bg-gray-100/80 flex-row justify-between">
                        <NeuButton height={50} width={150} onPress={resetChecklist}>
                            <Text className="text-gray-400 text-lg font-semi-bold">Reset</Text>
                        </NeuButton>
                        <NeuButton height={50} width={150} onPress={navigateToCameraScreen}>
                            <Text className="text-gray-400 text-lg font-semi-bold">Submit</Text>
                        </NeuButton>
                    </View>
                    <BottomSheet
                        ref={sheetRef}
                        index={-1} //initially hide the bottomsheet by using -1
                        snapPoints={snapPoints}
                        onChange={handleSheetChange}
                        enablePanDownToClose={true}
                        // handleIndicatorStyle={{backgroundColor:'#de9de0'}}
                        handleIndicatorStyle={{display:'none'}}
                        backgroundStyle={{backgroundColor: 'transparent', borderRadius: 25, opacity: 0.7, overflow: 'hidden'}}
                    >
                        <BlurView intensity={70} tint="light" style={{ flex: 1 }}>
                        <BottomSheetScrollView>
                            <View className="p-10">
                                <Text className="text-2xl text-purple-600 font-semibold pb-5">Steps :</Text>
                                {jsonData.map((item, index) => (
                                    <View key={index}>
                                        <Text className="text-gray-600 font-semibold">{item.timestamp}</Text>
                                        {Object.keys(item.actions).map((action, idx) => (
                                            <Text className="text-xl font-semibold text-purple-600" key={idx}>
                                                {index * Object.keys(item.actions).length + idx + 1}. {action}
                                            </Text>
                                        ))}
                                    </View>
                                ))}
                            </View>
                        </BottomSheetScrollView>
                        <View className="justify-center items-center p-10">
                            <Text className="text-gray-400">Swipe All Down to Dismiss</Text>
                        </View>
                    </BlurView>
                    </BottomSheet>
                </LinearGradient>
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