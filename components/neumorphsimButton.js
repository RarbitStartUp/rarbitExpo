import { useState } from 'react';
import { Animated,TouchableOpacity } from 'react-native';

// neumorphsimButton
export const NeuButton = ({
  height,
  width,
  maxWidth,
  backgroundColor,
  shadowColor,
  borderRadius,
  borderColor,
  overflow,
  onPress,
  disabled,
  children
}) => {
  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

  const [scaleValue] = useState(new Animated.Value(1));

  const animateButton = () =>{
    Animated.timing(scaleValue,{
      toValue:0.97,
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
      onPress={() => {
        onPress();
        animateButton();
      }}
      disabled={disabled}
      style={{
          height: height ? height : 50,
          width: width ? width :'80%', // Set width to 80% of the device width
          maxWidth: maxWidth ? maxWidth : 400 , // Optional: Set a maximum width if needed
          backgroundColor: backgroundColor ? `${backgroundColor}` : '#ededed', // Adjust the color as per your preference
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: borderRadius? borderRadius : 8, // Adjust the border radius as per your preference
          borderColor : borderColor? `${borderColor}` : 'transparent',
          borderWidth: 1, // Add borderWidth to show the border
          marginHorizontal: 'auto', // Center horizontally
          marginVertical:10,
          shadowColor: shadowColor ? shadowColor : '#dcdcdc',
          shadowOffset:{ width: 4, height: 4 },
          shadowOpacity:1,
          shadowRadius:5,
          overflow: overflow ? `${overflow}` : 'visible', // To clip the inner shadow
          transform:[
            {
              scale: scaleValue
            }
          ]
        }}
  >
    <AnimatedTouchableOpacity
    onPress={() => {
      onPress();
      animateButton();
    }}
    disabled={disabled}
      style={{
          height: height ? height : 50,
          width: width ? width :'100%', // Set width to 80% of the device width
          maxWidth: maxWidth ? maxWidth : 400 , // Optional: Set a maximum width if needed
          backgroundColor: backgroundColor ? `${backgroundColor}` : '#ededed', // Adjust the color as per your preference
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: borderRadius? borderRadius : 8, // Adjust the border radius as per your preference
          borderColor : borderColor? `${borderColor}` : 'transparent',
          borderWidth: 1, // Add borderWidth to show the border
          marginHorizontal: 'auto', // Center horizontally
          marginVertical:10,
          shadowColor: shadowColor ? shadowColor : '#ffffff',
          shadowOffset:{ width: -4, height: -4 },
          shadowOpacity:1,
          shadowRadius:5,
          overflow: overflow ? `${overflow}` : 'visible', // To clip the inner shadow
          // transform:[
          //   {
          //     scale: scaleValue
          //   }
          // ]
        }}
  >
  {children}
      </AnimatedTouchableOpacity>
    </AnimatedTouchableOpacity>
    // </Animated.View>
    );
  };

{/* <TouchableOpacity
      onPress={handleUpload}
      disabled={pending}
      style={{
      height: 50,
                    width: '80%', // Set width to 80% of the device width
                    maxWidth: 400, // Optional: Set a maximum width if needed
                    backgroundColor: '#ededed', // Adjust the color as per your preference
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8, // Adjust the border radius as per your preference
                    marginHorizontal: 'auto', // Center horizontally
                    marginVertical:10,
                    // shadowColor:"#e4e4e4",
                    shadowColor:"#dcdcdc",
                    shadowOffset:{ width: 4, height: 4 },
                    shadowOpacity:1,
                    shadowRadius:5
                  }}
      >
            <Text className="text-gray-400 text-lg font-semi-bold">{pending ? 'Uploading...' : 'Upload'}</Text>
      </TouchableOpacity> */}