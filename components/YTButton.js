import React, { useState } from 'react';
import { View, Button, WebView, StyleSheet } from 'react-native';
import ModalDragView from 'react-native-modal-drag-view';

export const YouTubeButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Button title="Open YouTube Video" onPress={() => setModalVisible(true)} />
      <ModalDragView
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        containerStyle={styles.modalContainer}
        dragItemContainerStyle={styles.draggableContainer}
        dragDirection="both"
      >
        <View style={styles.webview}>
          <WebView
            source={{ uri: 'https://www.youtube.com/embed/VIDEO_ID' }} // Replace VIDEO_ID with your YouTube video ID
          />
        </View>
      </ModalDragView>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 20,
  },
  draggableContainer: {
    backgroundColor: 'transparent',
  },
  webview: {
    width: '100%',
    height: 300, // Adjust the height as needed
  },
});