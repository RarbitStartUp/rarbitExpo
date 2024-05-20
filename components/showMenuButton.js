import React, { useState, useRef } from 'react';
import { TouchableOpacity, Animated, Easing, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useSound } from '../util/SoundProvider';

export const ShowMenuButton = ({ children }) => {
  const [isRotated, setIsRotated] = useState(false);
  
  const spinValue = useRef(new Animated.Value(0)).current;
  const panelHeight = useRef(new Animated.Value(0)).current;
  
  const { playSound, soundEnabled } = useSound();
  const flipIconsSound = require('../assets/pageturn-102978.mp3');

  const handlePress = () => {
    
    if(soundEnabled){
      playSound(flipIconsSound);
    }
    const targetRotation = isRotated ? 0 : 1;

    Animated.parallel([
      Animated.timing(
        spinValue,
        {
          toValue: targetRotation,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true
        }
      ),
      Animated.timing(
        panelHeight,
        {
          toValue: targetRotation === 1 ? 800 : 0, // Adjust panel height based on rotation
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: false
        }
      )
    ]).start();

    setIsRotated(!isRotated);
  }

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  return (
    <View style={{ overflow: 'hidden' }}>
      <TouchableOpacity onPress={handlePress}>
        <Animated.View style={{ transform: [{ rotate: spin }], alignSelf: 'center' }}>
          <FontAwesome6 name="eject" size={24} color="#ffffff" />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={{ height: panelHeight, marginTop: 20 }}>
        {children}
      </Animated.View>
    </View>
  );
}