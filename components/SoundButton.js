import React from 'react';
import { Switch,TouchableOpacity } from 'react-native';
import { useSound } from '../util/SoundProvider';
import { Ionicons,MaterialIcons} from '@expo/vector-icons';

export const SoundButton = ({color}) => {
  const { soundEnabled, setSoundEnabled } = useSound();

  const toggleSound = () => {
    setSoundEnabled(prevState => !prevState);
  };

  return (
    <TouchableOpacity
    className="mr-5"
    onPress={toggleSound} 
  >
      { soundEnabled ? (
        <Ionicons name="volume-medium" size={30} color={color} />
      ):(
        <MaterialIcons name="volume-off" size={30} color={color} />
      )}
  </TouchableOpacity>
    // <Switch value={soundEnabled} onValueChange={toggleSound} />
  );
};
