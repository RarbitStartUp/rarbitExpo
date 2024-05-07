// CornerBorder.js

import React from 'react';
import { View } from 'react-native';

export const CornerBorder = ({ width, height, borderColor,borderWidth, borderRadius  }) => {
  return (
    <>
    {/* Top left corner */}
    <View
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: width,  // Adjust the size of the corner
      height: height, // Adjust the size of the corner
      borderTopWidth: borderWidth ? borderWidth : 1,  // Add top border to the corner
      borderLeftWidth: borderWidth ? borderWidth : 1, // Add left border to the corner
      borderColor: borderColor ? borderColor :'#F3E7E9',
      borderTopLeftRadius: borderRadius ? borderRadius : 10,
    }}
  />
  {/* Top right corner */}
  <View
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: width,  // Adjust the size of the corner
      height: height, // Adjust the size of the corner
      borderTopWidth: borderWidth ? borderWidth : 1,   // Add top border to the corner
      borderRightWidth: borderWidth ? borderWidth : 1, // Add right border to the corner
      borderColor: borderColor ? borderColor :'#F3E7E9',
      borderTopRightRadius: borderRadius ? borderRadius : 10,
    }}
  />
  {/* Bottom left corner */}
  <View
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: width,  // Adjust the size of the corner
      height: height, // Adjust the size of the corner
      borderBottomWidth: borderWidth ? borderWidth : 1,  // Add bottom border to the corner
      borderLeftWidth: borderWidth ? borderWidth : 1,     // Add left border to the corner
      borderColor: borderColor ? borderColor :'#F3E7E9',
      borderBottomLeftRadius: borderRadius ? borderRadius : 10,
    }}
  />
  {/* Bottom right corner */}
  <View
    style={{
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: width,  // Adjust the size of the corner
      height: height, // Adjust the size of the corner
      borderBottomWidth: borderWidth ? borderWidth : 1,   // Add bottom border to the corner
      borderRightWidth: borderWidth ? borderWidth : 1,    // Add right border to the corner
      borderColor: borderColor ? borderColor :'#F3E7E9',
      borderBottomRightRadius:borderRadius ? borderRadius : 10,
    }}
  />
    </>
  );
};