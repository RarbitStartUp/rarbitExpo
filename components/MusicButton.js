import React, { useState, useEffect } from 'react';
import {  TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useMusic } from '../util/MusicProvider';

export function MusicButton({color}) {
  const { musicEnabled, setMusicEnabled } = useMusic();


  const toggleMusic = () => {
    setMusicEnabled(prev => !prev); // Toggle the music state
  };

  return (
    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //   <Switch
    //     value={musicEnabled}
    //     onValueChange={toggleMusic}
    //   />
    <TouchableOpacity
      className="mr-5"
      onPress={toggleMusic} 
    >
        { musicEnabled ? (
            <MaterialIcons name="music-note" size={30} color={color}/>
            
        ):(
            <MaterialIcons name="music-off" size={30} color={color}/>
        )}
    </TouchableOpacity>
    // </View>
  );
}
