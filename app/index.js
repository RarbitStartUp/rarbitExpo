import React, { useState,useRef,useMemo,useCallback } from 'react';
import { Animated,Button,Easing, View, Text,TextInput, TouchableOpacity,StyleSheet } from 'react-native';
// import Toast from 'react-native-root-toast';
import Toast from 'react-native-toast-message';
import { useRouter } from "expo-router";
import { UploadVideo } from "../components/UploadVideo"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientText } from '../components/GradientText';
import { NeuButton } from '../components/neumorphsimButton';
import { Entypo,AntDesign,FontAwesome5,FontAwesome6} from '@expo/vector-icons';
import { MusicButton } from "../components/MusicButton"
import { SoundButton } from '../components/SoundButton';
import { useSound } from '../util/SoundProvider';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import * as Haptics from 'expo-haptics';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

export default function Index(){

    const router = useRouter();
    const insets = useSafeAreaInsets();

    function haptics(type) {
        Haptics.impactAsync(type);
    }
    
    // Usage
    const light = Haptics.ImpactFeedbackStyle.Light; // Change this to the desired type
    const medium = Haptics.ImpactFeedbackStyle.Medium; // Change this to the desired type
    const heavy = Haptics.ImpactFeedbackStyle.Heavy; // Change this to the desired type

    const { playSound, soundEnabled } = useSound();
    const buttonClickSound = require('../assets/shooting-sound-fx-159024.mp3');
    
     // Function to navigate to CameraScreen
     const navigateToCameraScreen = () => {
    //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      haptics(heavy);
      if(soundEnabled){
          playSound(buttonClickSound);
      }
      console.log('Open Camera button pressed');
      router.push({ pathname: "/cameraScreen"});
  };
     // Function to navigate to CheckboxScreen
     const navigateToCheckboxScreen = () => {
    //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      haptics(heavy);
      playSound(buttonClickSound);
      console.log('Open Camera button pressed');
      router.push({ pathname: "/checkbox"});
  };

     const navigateToBSUserList = () => {
    //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      haptics(heavy);
      playSound(buttonClickSound);
      console.log('Open BottomSheet button pressed');
      router.push({ pathname: "/bsUserList"});
  };

    return (
        <>
        <View
            style={{
            paddingTop: insets.top,
            // paddingLeft: insets.left,
            // paddingBottom: insets.bottom,
            // paddingRight: insets.right,
            }}
            />
        <View className="flex flex-1 flex-col justify-between items-center h-full relative ">
        <View className="flex flex-row justify-end items-center px-5 w-full">
        <MusicButton color="#d2d2d2"/>
        <SoundButton color="#d2d2d2"/>
        <FontAwesome6 name="circle-user" size={35} color="#d2d2d2"/>
        </View>
            <View className="flex justify-center mx-5">
                <GradientText fontSize={100} colour1={'#fabada'} colour2={'#8A2BE2'}>
                    Hello
                </GradientText>
                <Text className="text-3xl font-bold text-gray-400">
                    Take your First Step to try Action Recognition
                </Text>
            </View>
            <UploadVideo/>
            <View className="flex flex-row mt-20 justify-center items-center w-full justify-evenly">
                <NeuButton 
                onPress={navigateToCameraScreen}
                backgroundColor="#ededed"
                height={55}
                width={55}
                maxWidth={55}
                borderRadius={75}
                >
                <FontAwesome5 name="pencil-alt" size={30} color="#cacaca" />
                </NeuButton>
                <NeuButton 
                onPress={navigateToCameraScreen}
                backgroundColor="#ededed"
                height={55}
                width={55}
                maxWidth={55}
                borderRadius={75}
                >
                <FontAwesome5 name="image" size={30} color="#cacaca" />
                </NeuButton>
                <NeuButton 
                onPress={navigateToCameraScreen}
                backgroundColor="#ededed"
                height={55}
                width={55}
                maxWidth={55}
                borderRadius={75}
                >
                <AntDesign name="copy1" size={30} color="#cacaca" />
                </NeuButton>
                <NeuButton 
                    onPress={navigateToCameraScreen}
                    backgroundColor="#ededed"
                    height={55}
                    width={55}
                    maxWidth={55}
                    borderRadius={75}
                >
                <Entypo name="camera" size={30} color="#cacaca" />
                </NeuButton>
            </View>
            <View className="h-10"/>
            <TouchableOpacity
                onPress={navigateToCheckboxScreen}
                style={{
                    position:"absolute",
                    bottom:50,
                }}
                >
                <Text className="text-gray-400 text-lg font-semi-bold">Checkbox Dev mode</Text>
            </TouchableOpacity>
            </View>
        </>
    );
}

