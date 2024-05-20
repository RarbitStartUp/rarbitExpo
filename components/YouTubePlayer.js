import React, { useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { FontAwesome5 } from "@expo/vector-icons"

export function YouTubePlayer ({ videoId, timestamp }) {

    console.log("videoId inside YoutubePlayer :",videoId);
    console.log("YoutubePlayer is loaded.");
    console.log("timestamp in YoutubePlayer:", timestamp);

    const playerRef = useRef();
    // Convert the timestamp to seconds
    const [hours, minutes, seconds] = timestamp.split(':');
    const totalSeconds = parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    console.log("totalSeconds :",totalSeconds);

    // Function to seek to a specific time in the video
    const seekToTime = () => {
        // Check if playerRef is available
        if (playerRef.current) {
            // Seek to the specified time in seconds
            playerRef.current.seekTo(totalSeconds, true); // true allows seeking ahead
        }
    };

  return (
    <View className="">
      <TouchableOpacity 
      className="flex-row space-x-3"
      onPress={seekToTime}>
          <Text className="text-gray-700 text-lg font-bold mb-3 ml-3">
            Jump to {timestamp}
          </Text>
          <FontAwesome5 name="hand-point-up" size={24} color="gray"
          style={{ transform: [{ rotate: '325deg' }] }} // Rotate the icon 45 degrees
          />
      </TouchableOpacity>
      <YoutubePlayer
        ref={playerRef}
        height={250}
        videoId={videoId}
      />
    </View>
  );
}