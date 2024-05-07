import React from "react";
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient'

// BaseToast styles
// const HEIGHT = 100;
const WIDTH = "95%";
const BORDER_RADIUS = 10;

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    // height: HEIGHT,
    width: WIDTH,
    borderRadius: BORDER_RADIUS,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: BORDER_RADIUS,
    elevation: 2,
    backgroundColor: "#FFF",
    margin:10,
  },
//   leadingBorder: {
//     borderLeftWidth: 10,
//     borderLeftColor: "#F3E7E9",
//   },
  gradientBorder: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 10,
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
  },
//   toastContainer: {
//     marginHorizontal: 20, // Add horizontal margin
//     marginTop: 20, // Add top margin
//     marginBottom: 20, // Add bottom margin
//   },
  contentContainer: {
    paddingHorizontal: 25,
    paddingVertical: 20, // Adjust the vertical padding to make the text area taller
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  text1: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#000",
    width: "100%",
  },
  text2: {
    fontSize: 10,
    color: "#979797",
    flexShrink: 1,
  },
});

const CustomBaseToast = ({ text1, text2, height, onPress }) => {
  return (
    // <TouchableOpacity onPress={onPress} style={[{ height},styles.base, styles.leadingBorder, styles.toastContainer]}>
    <TouchableOpacity onPress={onPress} style={[{ height},styles.base, styles.leadingBorder]}>
              {/* Add gradient border here */}
      <LinearGradient
        colors={['#ffb8de', '#b2b2ff']} // Add your gradient colors here
        start={{x: 0, y: 0}} // Gradient start point
        end={{x: 0, y: 1}} // Gradient end point
        style={styles.gradientBorder}
      />
      <View style={styles.contentContainer}>
        <Text className="text-lg font-bold mb-5 mt-2">{text1}</Text>
        <Text className="text-sm text-gray-500">{text2}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const toastConfig = {
  error: (props) => <CustomBaseToast {...props} />,
  success: (props) => <CustomBaseToast {...props} />,
};
