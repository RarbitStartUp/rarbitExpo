import { Stack } from "expo-router";

export const unstable_settings = {
    initialRouteName: "uploadVideo",
};

export default function Layout() {
    return <Stack initialRouteName="uploadVideo" />;
}