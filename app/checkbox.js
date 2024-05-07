// displayCheckbox.js
import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { useWebSocket } from '../util/useWebSocket';
import {
    View,
    Text,
    TextInput,
    Button,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { button } from '../style/NativeWind.js';
import Toast from 'react-native-toast-message';
import { useRouter, useLocalSearchParams } from 'expo-router';


export default function Checkbox() {
    // Access the route object to get the passed data
    
    // ***For Production ( comment out for development - 5 lines ):
    const { responseData } = useLocalSearchParams();
    console.log('responseData in Checkbox.jsx:', responseData);
        
    const parsedResponseData = JSON.parse(responseData);
    console.log('parsedResponseData in Checkbox.jsx :', parsedResponseData);
    const checklist = parsedResponseData.checklist;

    // ***For Development ( comment out for production - 1 line ):
    // const checklist = [{"timestamp":"00:00:02","objects":{"leek":true,"knife":true,"cutting board":true},"actions":{"cut":true}},{"timestamp":"00:00:10","objects":{"leek":true,"water":true,"bowl":true},"actions":{"wash":true}},{"timestamp":"00:00:38","objects":{"leek":true,"paper towel":true},"actions":{"dry":true}},{"timestamp":"00:00:43","objects":{"leek":true,"knife":true,"cutting board":true},"actions":{"cut":true}},{"timestamp":"00:01:03","objects":{"leek":true,"bowl":true},"actions":{"store":true}}]
    
    // log the checklist :
    console.log('checklist in Checkbox.jsx :', checklist);

    const [jsonData, setJsonData] = useState(checklist); // Added state for jsonData
    const [objectInputValues, setObjectInputValues] = useState(['']);
    const [actionInputValues, setActionInputValues] = useState(['']);
    const [objectItems, setObjectItems] = useState([]);
    const [actionItems, setActionItems] = useState([]);

    const router = useRouter();
    const { socket, isWebSocketOpen } = useWebSocket();
    console.log('socket:', socket);
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
                const objects = Object.keys(stepData.objects);
                const actions = Object.keys(stepData.actions);
                allObjects = [...allObjects, ...objects];
                allActions = [...allActions, ...actions];
            });

            setObjectItems(allObjects);
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

    const resetChecklist = () => {
        console.log('Reset button pressed');
        try {
            console.log('jsonData before reset:', jsonData);
            // console.log('initialJsonData before reset:', initialJsonData);
            // Reset jsonData to its original state
            setJsonData(checklist);
            console.log('jsonData after reset:', jsonData);
            // console.log('initialJsonData after reset:', initialJsonData);

            // Reset objectItems and actionItems
            let allObjects = [];
            let allActions = [];

            checklist.forEach(stepData => {
                const objects = Object.keys(stepData.objects);
                const actions = Object.keys(stepData.actions);
                allObjects = [...allObjects, ...objects];
                allActions = [...allActions, ...actions];
            });

            setObjectItems(allObjects);
            console.log('objectItems after reset:', allObjects);
            setActionItems(allActions);
            console.log('actionItems after reset:', allActions);
            console.log('jsonData after reset at the bottom:', jsonData);
        } catch (error) {
            console.error('Error resetting checklist:', error);
            Toast.show('Error resetting checklist. Please try again.');
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
        router.push({ pathname: "/cameraScreen"});
        // router.push({ pathname: "/cameraScreen", params: { jsonData: JSON.stringify(jsonData) } });
    };

    // Function to add an item to a specific step
    const addItemToStep = (listId, inputId, stepIndex) => {
        try {
            const newItem = listId === 'objectList' ? objectInputValues[stepIndex] : actionInputValues[stepIndex];

            if (!newItem) {
                Toast.show('Please enter a valid item.');
                return;
            }

            // Clear the input value after adding the new item
            if (listId === 'objectList') {
                setObjectInputValues(prevValues => {
                    const newValues = [...prevValues];
                    newValues[stepIndex] = ''; // Clear the input value for the current step
                    return newValues;
                });
            } else if (listId === 'actionList') {
                setActionInputValues(prevValues => {
                    const newValues = [...prevValues];
                    newValues[stepIndex] = ''; // Clear the input value for the current step
                    return newValues;
                });
            }

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

    console.log('jsonData in Checkbox component before rendering :', jsonData);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView className="flex-1 p-10">
                {jsonData ? jsonData.map((step, stepIndex) => (
                    <View key={stepIndex + 1} className="mb-10">
                        <Text>Step{stepIndex + 1}:</Text>
                        <Text>{step.timestamp}</Text>
                        <View className="mb-10">
                            <Text>Objects</Text>
                            {Object.keys(step.objects).map((objectKey, objIndex) => (
                                <View key={objIndex} className="flex-row items-center mb-2">
                                    <Text>{objIndex + 1}. {objectKey}</Text>
                                    <TouchableOpacity
                                        className={button({ size: 'sm', color: 'secondary' })}
                                        onPress={() =>
                                            removeNewItem('objectList', objectKey, stepIndex)
                                        }>
                                        <Text>Remove</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                            <View className="flex-row items-center mb-2">
                                <TextInput
                                    value={objectInputValues[stepIndex]}
                                    onChangeText={text => {
                                        const newValues = [...objectInputValues];
                                        newValues[stepIndex] = text;
                                        setObjectInputValues(newValues);
                                    }}
                                    className="flex-1 p-5 border-1 mr-10"
                                    placeholder={`Add new object for Step ${stepIndex + 1}`}
                                />
                                {/* {console.log("newItemInputRef.current:", newItemInputRef.current)} */}
                                {/* {console.log("newItemInputRef.current._internalFiberInstanceHandleDEV.memoizedProps.forwardedRef.current.memoizedProps:", newItemInputRef.current._internalFiberInstanceHandleDEV.memoizedProps.forwardedRef.current.memoizedProps)} */}
                                <TouchableOpacity
                                    className={button({ size: 'sm', color: 'secondary' })}
                                    onPress={() =>
                                        addItemToStep(
                                            'objectList',
                                            `newObjectInput${stepIndex}`,
                                            stepIndex,
                                        )
                                    }>
                                    <Text>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <Text>Actions</Text>
                            {Object.keys(step.actions).map((actionKey, actIndex) => (
                                <View key={actIndex} className="flex-row items-center mb-2">
                                    <Text>{actIndex + 1}. {actionKey}</Text>
                                    <TouchableOpacity
                                        className={button({ size: 'sm', color: 'secondary' })}
                                        onPress={() =>
                                            removeNewItem('actionList', actionKey, stepIndex)
                                        }>
                                        <Text>Remove</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                            <View className="flex-row items-center mb-2">
                                <TextInput
                                    value={actionInputValues[stepIndex]}
                                    onChangeText={text => {
                                        const newValues = [...actionInputValues];
                                        newValues[stepIndex] = text;
                                        setActionInputValues(newValues);
                                    }}
                                    className="flex-1 p-5 border-1 mr-10"
                                    placeholder={`Add new action for Step ${stepIndex + 1}`}
                                />
                                <TouchableOpacity
                                    className={button({ size: 'sm', color: 'secondary' })}
                                    onPress={() =>
                                        addItemToStep(
                                            'actionList',
                                            `newActionInput${stepIndex}`,
                                            stepIndex,
                                        )
                                    }>
                                    <Text>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )) : null}
            </ScrollView>
            {/* <View className="flex flex-row justify-between mt-10"> */}
            <View className="absolute bottom-0 left-0 p-4 bg-gray-200 w-full flex-row justify-between">
                <Button
                    className={button({ size: 'sm', color: 'secondary' })}
                    title="Reset"
                    onPress={resetChecklist}
                />
                <Button
                    className={button({ size: 'sm', color: 'secondary' })}
                    title="Submit"
                    onPress={navigateToCameraScreen}
                />
            </View>
        </View>
    );
}
