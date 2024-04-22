import { Stack } from "expo-router";
import { WebSocketProvider } from '../util/useWebSocket'; // Import WebSocketProvider
// export const unstable_settings = {
//     initialRouteName: "uploadVideo",
// };

export default function Layout() {
    return (
        <WebSocketProvider>
            <Stack screenOptions={{
           headerShown:false,
            }}
                initialRouteName="index">
               <Stack.Screen name="index" options={{headerTitle:"Upload"}}/>
               <Stack.Screen name="checkbox" options={{headerTitle:"Checkbox"}}/>
            </Stack>
        </WebSocketProvider>
    );
}
