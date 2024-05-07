import React, { createContext, useState, useContext, useEffect } from 'react';
import { Audio } from 'expo-av';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [sound, setSound] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  async function playSound(soundFileName){
    if (soundEnabled && soundFileName) {
      try {
          const { sound } = await Audio.Sound.createAsync(soundFileName);
          await sound.replayAsync();
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    }
  };

  return (
    <SoundContext.Provider value={{ soundEnabled, setSoundEnabled, playSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
