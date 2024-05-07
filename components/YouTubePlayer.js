import React from 'react';
import { WebView } from 'react-native-webview';

export function YouTubePlayer({videoId}) {
  console.log("videoId inside YoutubePlayer :",videoId);
  // Construct the YouTube embed URL with parameters
  // const videoId = 'M7lc1UVf-VE'; // Replace with your video ID
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0`;

  return (
    <WebView
      style={{ flex: 1 }}
      javaScriptEnabled={true}
      source={{ uri: embedUrl }}
    />
  );
};