import React, { useState } from 'react';
import { Animated, TouchableOpacity } from 'react-native';

// CameraButton
export const CameraButton = ({
  isSendingFrames,
  isRecording,
  isPaused,
  onPress,
  disabled,
  children
}) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      })
    ]).start(() => {
      if (onPress) {
        // Execute onPress after animation completes
        setTimeout(onPress, 100);
      }
    });
  };

  let borderColor;
  if (isSendingFrames) {
    borderColor = '#00FFFF'; // Blue
    // borderColor = 'rgba(0, 255, 255, 0.5)';// Blue with 50% opacity
  } else if (isRecording && !isPaused) {
    borderColor = '#a0e7e1'; // Green when recording and not paused
    // borderColor = 'rgba(57, 255, 20, 0.5)'; // Green with 50% opacity when recording and not paused
  } else if (isPaused) {
    borderColor = 'transparent'; // Red when paused
    // borderColor = '#FF0000'; // Red when paused
    // borderColor = '#ff1493'; // Neon Pink when paused
    // borderColor = 'rgba(255, 0, 0, 0.5)'; // Red with 50% opacity when paused
    // borderColor = '#00FFFF'; // Blue when paused
  } else if (isRecording) {
    borderColor = 'green'; // Green when recording
  } else {
    borderColor = 'transparent'; // Transparent otherwise
  }  

  let shadowColor;
  if (isSendingFrames) {
    shadowColor = '#00FFFF'; // Blue
    // shadowColor = 'rgba(0, 255, 255, 0.5)';// Blue with 50% opacity
  } else if (isRecording && !isPaused) {
    shadowColor = '#a0e7e1'; // Green when recording and not paused
    // shadowColor = 'rgba(57, 255, 20, 0.5)'; // Green with 50% opacity when recording and not paused
  } else if (isPaused) {
    shadowColor = 'transparent'; // Neon Pink when paused
    // shadowColor = '#FF0000'; // Red when paused
    // shadowColor = '#ff1493'; // Neon Pink when paused
    // shadowColor = 'rgba(255, 0, 0, 0.5)'; // Red with 50% opacity when paused
    // shadowColor = '#00FFFF'; // Blue when paused
  } else if (isRecording) {
    shadowColor = 'green'; // Green when recording
  } else {
    shadowColor = 'transparent'; // Transparent otherwise
    // shadowColor = shadowColor; // Transparent otherwise
  }  

  return (
    <TouchableOpacity
      onPress={animateButton}
      disabled={disabled}
      style={{
        width: 50,
        height: 50,
        alignSelf: "center",
        // padding: 10,
        marginBottom:10,
        // backgroundColor: "rgba(243, 231, 233, 1)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        // backgroundColor: "#333333",
        borderRadius: 75,
        borderWidth : 2,
        borderColor : borderColor,
        shadowColor : shadowColor ? shadowColor : 'transparent',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.5, // Adjust the opacity of the emitting light
        shadowRadius: 5, // Adjust the spread radius of the emitting light
        elevation: 5, // Android shadow elevation
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ scale: scaleValue }]
      }}>
      {children}
    </TouchableOpacity>
  );
};
