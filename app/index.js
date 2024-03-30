import { StyleSheet, Text, View } from "react-native";
import UploadVideo from "./uploadVideo";

export default function Page() {
  return (
    // <View style={styles.container}>
    <View className="flex-1 items-center justify-center bg-white">
      <View style={styles.main}>
        {/* <Text style={styles.title}>Hello World</Text> */}
        {/* <Text className="text-black font-bold text-3xl">Hello World</Text> */}
        {/* <Text style={styles.subtitle}>This is the first page of your app.</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
