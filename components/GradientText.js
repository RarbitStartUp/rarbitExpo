import { Text} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from "expo-linear-gradient"

export const GradientText = ({ fontSize,colour1,colour2,children}) => {
    return (
        <MaskedView
        style={{ height: 130 }}
        maskElement={<Text style={{fontSize}}>{children}</Text>}
       >
         <LinearGradient
           colors={[`${colour1}`, `${colour2}`]}
           start={{ x: 0, y: 0 }}
           end={{ x: 1, y: 1 }}
           style={{ flex: 1 }}
         />
       </MaskedView>
    );
  };