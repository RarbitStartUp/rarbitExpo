import React, { useState } from 'react';
import { View, Button, Modal, WebView, StyleSheet } from 'react-native';

export const YouTubeButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Button title="Open YouTube Video" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <WebView
            source={{ uri: 'https://www.youtube.com/embed/VIDEO_ID' }} // Replace VIDEO_ID with your YouTube video ID
            style={styles.webview}
          />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22, // Adjust this value if needed
  },
  webview: {
    width: '100%',
    height: 300, // Adjust the height as needed
  },
});

