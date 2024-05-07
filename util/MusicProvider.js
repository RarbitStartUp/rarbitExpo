import React, { createContext, useState, useEffect, useContext } from 'react';
import { Audio } from 'expo-av';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
    
  const [backgroundMusic, setBackgroundMusic] = useState(null);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const playBackgroundMusic = async () => {
    if (backgroundMusic && musicEnabled) {
      await backgroundMusic.playAsync();
    }
  };

  const pauseBackgroundMusic = async () => {
    if (backgroundMusic && !musicEnabled) {
      await backgroundMusic.pauseAsync();
    }
  };


  // Load background music when the component mounts
  useEffect(() => {
    async function loadBackgroundMusic() {
      try {
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/summer-adventures-115949.mp3'),
            { isLooping: true }
        );
        // Adjust the volume of the background music
        await sound.setVolumeAsync(0.1); // Set the desired volume level (between 0 and 1)
        setBackgroundMusic(sound);
        setIsLoaded(true);
        console.log("background music is loaded.");
      } catch (error) {
        console.error('Error loading background music:', error);
        setIsLoaded(false);
      }
    }
  
    loadBackgroundMusic();

    // async function configureAudio() {
    //         await Audio.setAudioModeAsync({
    //             // You can adjust the volume here if needed
    //             volume: 0.1, // Default volume (maximum)
    //         });
    //     }
    // configureAudio();

    return () => {
      if (backgroundMusic) {
        backgroundMusic.unloadAsync();
      }
    };
  }, []); // Empty dependency array to run only once when the component mounts

  useEffect(() => {
    // Ensure that background music is loaded before attempting to play or pause
    if (isLoaded) {
      if (musicEnabled) {
        playBackgroundMusic();
      } else {
        pauseBackgroundMusic();
      }
    }
  }, [musicEnabled, isLoaded]);

  return (
    <MusicContext.Provider value={{ musicEnabled , setMusicEnabled }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
