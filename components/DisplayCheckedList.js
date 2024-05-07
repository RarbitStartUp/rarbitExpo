import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Entypo,AntDesign,FontAwesome5,FontAwesome6,Ionicons,MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import {CheckCircle} from 'react-native-feather';
import  LottieView  from 'lottie-react-native';

export function DisplayCheckedList({ fullChecklistString, jsonData }) {

    console.log("fullChecklistString in DisplayCheckedList:",fullChecklistString);
    console.log("jsonData in DisplayCheckedList:",jsonData);

    const [currentStepIndex, setCurrentStepIndex] = useState(0); 
    const [aiStepIndex, setAiStepIndex] = useState(0); 
    const [checklistData, setChecklistData] = useState(null); 

    useEffect(()=>{
        // Parse jsonData into a JavaScript object
        const parsedJsonData = JSON.parse(jsonData);
        console.log("parsedJsonData:",parsedJsonData);
        setChecklistData(parsedJsonData.map((step, index) => ({ ...step, stepIndex: index })));
    },[jsonData])
    
    // only checklistData got stepIndex property
    // originial jsonData doesn't have stepIndex property
    // only after you added it into checklistData
    console.log("checklistData:",checklistData);
    
    useEffect(() => {
        if (checklistData && checklistData.length > 0) {
            setCurrentStepIndex(checklistData[0].stepIndex);
        }
    }, [checklistData]);  

    useEffect(() => {
        if (fullChecklistString?.stepIndex) {
            setAiStepIndex(fullChecklistString.stepIndex);
        }
    }, [fullChecklistString]);

    useEffect(() => {
        if (allObjectsAndActionsAreTrue(fullChecklistString)) {
            if (currentStepIndex < aiStepIndex) {
                setCurrentStepIndex(prevIndex => prevIndex + 1);
            }
        }
    }, [fullChecklistString, currentStepIndex, aiStepIndex]);
    

    const renderChecklistItems = (checklistItems, checkboxStates) => {
        return (
            <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
            <View className="flex-row flex-wrap items-center w-full justify-stretch">
                {Object.keys(checklistItems).map((item, index) => (
                    <View key={index + 1} className="flex-row mr-3 items-center">
                        <Text className="mr-1 text-lg text-gray-700 font-bold">
                            {index + 1}.
                        </Text>
                        <Text className="mr-1 text-lg text-gray-700 font-bold">
                            {item}
                        </Text>
                        <Text className="my-3">
                            {checkboxStates[item] ? 
                            // <CheckCircle size={24} color="green" /> 
                            <LottieView
                                autoPlay={true}
                                style={{ width: 30, height: 30 }} // Adjust width and height as needed
                                source={require('../assets/finishAllTick.json')} // Replace 'path_to_tick_animation.json' with the actual path to your Lottie JSON file
                                loop={true}
                            />
                            : 
                            <Text className="text-gray-700">--</Text>}
                            {/* {checkboxStates[item] ? <Feather name="check" size={24} color="green" /> : '--'} */}
                            {/* {checkboxStates[item] ? 'yes' : '--'} */}
                        </Text>
                    </View>
                
                ))}
            </View>
            </ScrollView>
        );
    };

    function allObjectsAndActionsAreTrue(fullChecklistString) {
        const { objects, actions } = fullChecklistString;
      
        // Check if all objects are true
        for (const item in objects) {
          if (!objects[item]) {
            return false;
          }
        }
      
        // Check if all actions are true
        for (const item in actions) {
          if (!actions[item]) {
            return false;
          }
        }
      
        return true;
    }

    console.log("currentStepIndex:",currentStepIndex);
    console.log("aiStepIndex:",aiStepIndex);

    return (
        <View>
            { allObjectsAndActionsAreTrue(fullChecklistString) && (
                        <View className="flex flex-col">
                        <View className="flex flex-row items-center w-full justify-between">
                        <Text className="text-white text-xl font-bold">You have finished all steps!</Text>
                        <LottieView
                                autoPlay={true}
                                style={{ width: 100, height: 100 }} // Adjust width and height as needed
                                source={require('../assets/congratTick.json')} // Replace 'path_to_tick_animation.json' with the actual path to your Lottie JSON file
                                loop={true}
                                />
                        </View>
                        <Text className="mb-5 text-md text-gray-500 font-semibold">Please consider giving us feedback, or you can return to the home screen and try another detection. Thank you!</Text>
                        </View>
                )
            }
            {((currentStepIndex === aiStepIndex) && (checklistData !== null)) ? (
                <View>
                    <View className="flex-row items-center">
                        <View className="flex flex-row w-full space-x-2 items-center">
                            <Text className="text-2xl font-bold text-white drop-shadow-3xl">Current Step - Step {currentStepIndex + 1}</Text>
                            <Text className="text-gray-300">{checklistData[currentStepIndex].timestamp}</Text>
                            <MaterialIcons name="access-time" size={20} color="#939393" />
                        </View>
                        </View>
                    
                    {checklistData.map(step => (
                        (step.stepIndex === currentStepIndex) && (
                            <View key={step.stepIndex}>
                                {/* <Text>Timestamp : {step.timestamp}</Text> */}
                                <View className="flex flex-row w-full space-x-2 items-center">
                                <MaterialCommunityIcons name="human-handsdown" size={20} color="#939393" />
                                        {renderChecklistItems(step.actions, fullChecklistString.actions)}
                                </View>
                                <View className="flex flex-row w-full space-x-2 items-center">
                                    <Ionicons name="cube-outline" size={20} color="#939393" />
                                        {renderChecklistItems(step.objects, fullChecklistString.objects)}
                                </View>
                            </View>
                        )
                    ))}
                
                </View>
            ) : (
                <View>
                    <Text className="text-md text-gray-500 font-semibold">If you encounter an error message indicating that the step indexes are not in sync within the application, we kindly ask you to reach out to us for assistance and further guidance.</Text>
                </View>
            )}
                
        </View>
    );    
}
