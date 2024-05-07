import React, { useState, useRef } from 'react';
import { TouchableOpacity, Animated, Easing } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons'; // Assuming you've imported FontAwesome6 correctly

const ShowMenuButton = () => {
  const [isRotated, setIsRotated] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    const targetRotation = isRotated ? 0 : 1;

    Animated.timing(
      spinValue,
      {
        toValue: targetRotation,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start();

    setIsRotated(!isRotated);
  }

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'] // Rotate from 0deg (up) to 180deg (down)
  });

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <FontAwesome6 name="eject" size={24} color="#ffffff" />
      </Animated.View>
    </TouchableOpacity>
  );
}

export default ShowMenuButton;
