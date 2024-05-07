import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';

export const LightDarkTheme = ({ children }) => {
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LightDarkTheme;
