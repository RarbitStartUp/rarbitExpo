import React, { useState,useCallback,useEffect } from 'react';
import { Animated, KeyboardAvoidingView, Platform, View, Text, TextInput, Easing } from 'react-native';
import { AnimateTextInput } from "../components/AnimateTextInput";
import { useRouter } from "expo-router";
import axios from 'axios';
import { NeuButton } from './neumorphsimButton';
import { useSound } from "../util/SoundProvider";
import * as Haptics from 'expo-haptics';
import { useWebSocket } from '../util/useWebSocket';

// import Reanimated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withSequence,
//   withTiming,
//   interpolate,
// } from 'react-native-reanimated';

// Add axios debug mode here
axios.defaults.debug = true;

export function UploadVideo() {
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState('');
    const [inputLink, setInputLink] = useState('');
    const [pending, setPending] = useState(false);
    const router = useRouter();

    const { playSound, soundEnabled } = useSound();
    const buttonClickSound = require('../assets/shooting-sound-fx-159024.mp3');

    function haptics(type) {
        Haptics.impactAsync(type);
    }
    
    // Usage
    const light = Haptics.ImpactFeedbackStyle.Light; // Change this to the desired type
    const medium = Haptics.ImpactFeedbackStyle.Medium; // Change this to the desired type
    const heavy = Haptics.ImpactFeedbackStyle.Heavy; // Change this to the desired type
    
    // function extractVideoId(url) {
    //     const regex = /[?&]([^=#]+)=([^&#]*)/g;
    //     let match;
    //     while ((match = regex.exec(url))) {
    //       if (match[1] === 'v') {
    //         return match[2];
    //       }
    //     }
    //     return null;
    //   }

    function extractVideoId(url) {
        const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }    

    const {socket, isWebSocketOpen} = useWebSocket();
    console.log("isWebSocketOpen in UploadVideo:", isWebSocketOpen);

    useEffect(() => {
        if (isWebSocketOpen) {
            console.log('WebSocket connection opened successfully in UploadVideo');
        }
    }, [isWebSocketOpen]);

    useEffect(() => {
        if (!socket) return;
        
            // Listen for progress updates from the server
            socket.on('progressUpdate', (data) => {
            try {
                console.log(
                    'progressUpdate :',
                    data.progress ,
                );
                setProgress(data.progress);
            } catch (error) {
                console.error('Error processing WebSocket message:', error);
            }
        });

        socket.on('error', error => {
            console.error('WebSocket error in UploadVideo:', error);
        });

        socket.on('disconnect', () => {
            console.log('WebSocket connection closed in UploadVideo');
        });

        return () => {
            socket.close();
        };
    }, [socket]);

    async function upload(inputLink) {

        const url = inputLink;
        console.log('url in UploadVideo:', url);
        const videoId = extractVideoId(url);
        console.log('Video ID in UploadVideo:', videoId);
        
        const apiUrl = process.env.NODE_ENV === 'development'
        ? 'http://192.168.0.168:3001/api/uploadVideo'
        : 'https://rarbit.tech/api/uploadVideo';
    
        try {
            console.log('inputLink :', inputLink);
            console.log("apiUrl:", apiUrl);
            // Make an HTTP POST request to your server to upload the video
            const response = await axios.post(
                apiUrl,
                {
                    inputLink,
                },
            );
            console.log('response in UploadVideo Component :', response);
            // Before navigating to the Checkbox screen,
            // Keep only the necessary data, solved the Error : "Non-serializable values were found in the navigation state"
            const responseDataOnly = response.data;
            console.log("responseDataOnly :", responseDataOnly);
            // Navigate to the CheckboxScreen and pass the data as a parameter
            // navigation.navigate('Checkbox', {
            //     responseData: responseDataOnly,
            // });
            router.push({ pathname: "/checkbox", params: { responseData: JSON.stringify(responseDataOnly), videoId: videoId } });
        } catch (error) {
            console.error('Error uploading video:', error);
            setMessage('Upload failed'); // Move this line here
            throw new Error('Upload failed');
        }
    }

    const  handleUpload = async () => {
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        haptics(heavy);

        if(soundEnabled){
            playSound(buttonClickSound);
        }
        if (!inputLink.trim()) {
            // If inputLink is empty or contains only whitespace
            setMessage('Please paste your link');
            return;
        }
        
        setPending(true);
        // haptics();
            // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            // buttonScale.value = withSequence(
            //     withTiming(1.3, { duration: 200 }),
            //     withTiming(1, { duration: 200 }),
            // );
    
        try {
            // Call your upload action with inputLink
            await upload(inputLink);
            setMessage('Upload successful');
        } catch (error) {
            setMessage('Upload failed');
        } finally {
            setPending(false);
        }
    };

    function TextInputEffects(){
        haptics(heavy);

        if(soundEnabled){
            playSound(buttonClickSound);
        }
    };

    return (
    <KeyboardAvoidingView 
        className="flex flex-col w-4/5 justify-center items-center"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust this value as needed
    >
            <Text className="text-gray-400 pb-2">{message}</Text>
            {/* { progress && <Text>Upload Progress: {progress}%</Text> } */}
            <Text>Upload Progress: {progress}%</Text>
            {/* <ProgressBar progress={progress} color={'blue'} /> */}
            <AnimateTextInput
                // height={50}
                // width='100%'
                // borderRadius={10}
                placeholder="Paste Your Youtube Link"
                value={inputLink}
                onChangeText={setInputLink}
                onFocus={TextInputEffects}
                // className="my-2 py-2 px-4 border border-gray-300"
            /> 
            {/* <TextInput
                height={50}
                width='100%'
                borderRadius={10}
                placeholder="Paste Your Youtube Link"
                value={inputLink}
                onChangeText={setInputLink}
                className="my-2 py-2 px-4 border border-gray-300"
            />  */}
            <NeuButton height={50} width='100%' onPress={handleUpload} disabled={pending}>
                <Text className="text-gray-400 text-lg font-semi-bold">{pending ? 'Uploading...' : 'Upload'}</Text>
            </NeuButton>
        {/* </View> */}
    </KeyboardAvoidingView>
    );
}

