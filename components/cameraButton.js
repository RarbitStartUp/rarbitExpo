import { useState } from 'react';
import { Animated,TouchableOpacity } from 'react-native';

// CameraButton
export const CameraButton = ({
  onPress,
  disabled,
  children
}) => {
  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

  const [scaleValue] = useState(new Animated.Value(1));

  const animateButton = () =>{
    Animated.timing(scaleValue,{
      toValue:0.8,
      duration:200,
      useNativeDriver:true
    }).start(()=>{
      Animated.timing(scaleValue,{
          toValue :1,
          duration:200,
          useNativeDriver: true
      }).start();
    });
  }; 

  const handlePress = () => {
    animateButton();
    if (onPress) {
      // onPress();
      // Execute onPress after animation completes
      setTimeout(onPress, 100);
    }
  }; 
  
    return (
      // <Animated.View style=
      //           {[
      //               {
      //                   transform:[{ scale: scaleValue }],
      //                   height: height ? height : 50,
      //                   width: '100%', // Set width to 80% of the device width
      //                   maxWidth: maxWidth ? maxWidth : 400 ,
      //           },
      //           ]
      //           }>
      <AnimatedTouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={{
          width:55,
          height:55,
          alignSelf: "center",
          padding: 10,
          backgroundColor:"rgba(255, 255, 255, 0.3)",
          borderRadius:75,
          justifyContent: 'center',
          alignItems: 'center', // Center the content vertically and horizontally
          transform:[
            {
              scale: scaleValue
            }
          ]
      }}>
        {children}
  </AnimatedTouchableOpacity>
    // </Animated.View>
    );
  };