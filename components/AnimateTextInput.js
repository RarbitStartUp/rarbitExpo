import React, { useState } from 'react';
import { Animated, TextInput } from 'react-native';

export const AnimateTextInput = ({
  height,
  width,
  borderRadius,
  placeholder,
  value,
  onChangeText,
  onFocus
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));

  const animateTextInput = () => {
    setIsFocused(true);
    Animated.timing(scaleValue, {
      toValue: 1.1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const resetAnimation = () => {
    setIsFocused(false);
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        height: height ? height : 50,
        width: width ? width : '100%',
        borderRadius: borderRadius ? borderRadius : 10,
        marginTop: 8,
        marginBottom: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderWidth: isFocused ? 2 : 1, // Change border width when focused
        borderColor: isFocused ? '#ebd3f8' : '#e2e2e2', // Change border color when focused
        // borderColor: '#e2e2e2', // Change border color when focused
        opacity :10,
        transform: [{ scale: scaleValue }],
      }}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={()=>{onFocus();animateTextInput();}}
        onBlur={resetAnimation}
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
        //   fontSize: 16,
        }}
      />
    </Animated.View>
  );
};
