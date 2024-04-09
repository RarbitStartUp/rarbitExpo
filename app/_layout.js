import { Stack } from "expo-router";
import { WebSocketProvider } from '../util/useWebSocket'; // Import WebSocketProvider

export const unstable_settings = {
    initialRouteName: "uploadVideo",
};

export default function Layout() {
    return (
        <WebSocketProvider>
            <Stack initialRouteName="uploadVideo" />
        </WebSocketProvider>
    );
}
