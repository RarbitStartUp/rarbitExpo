import { Stack } from "expo-router";
import { WebSocketProvider } from '../util/useWebSocket'; // Import WebSocketProvider
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootSiblingParent } from 'react-native-root-siblings';
import { MusicProvider } from '../util/MusicProvider'
import { SoundProvider } from '../util/SoundProvider';
import Toast from 'react-native-toast-message';
import { toastConfig } from "../components/toastConfig";
import { LightDarkTheme } from '../components/LightDarkTheme';

// export const unstable_settings = {
//     initialRouteName: "uploadVideo",
// };

export default function Layout() {
    return (
        <>
        <WebSocketProvider>
            <SafeAreaProvider>
            <LightDarkTheme>
            <MusicProvider>
            <SoundProvider>
                <Stack screenOptions={{
                    headerShown:false,
                }}
                initialRouteName="index">
                <Stack.Screen name="index" options={{headerTitle:"Upload"}}/>
                <Stack.Screen name="checkbox" options={{headerTitle:"Checkbox"}}/>
                <Stack.Screen name="bsUserList" options={{headerTitle:"bsUserList"}}/>
                </Stack>
            </SoundProvider>
            </MusicProvider>
            </LightDarkTheme>
            </SafeAreaProvider>
        </WebSocketProvider>
        <Toast config={toastConfig} />
        </>
    );
}
