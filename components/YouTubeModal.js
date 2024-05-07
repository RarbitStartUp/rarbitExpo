import React from 'react';
import { Modal, Button, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export const YouTubeModal = ({ videoId, visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* <View style={styles.modalContainer}> */}
        <WebView
          javaScriptEnabled={true}
          source={{ uri: `https://www.youtube.com/embed/${videoId}?autoplay=1` }}
          style={styles.webview}
        />
        <Button title="Close" onPress={onClose} />
      {/* </View> */}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1/3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    width: '100%',
    height: '50%', // Adjust the height as needed
  },
});

export default YouTubeModal;
