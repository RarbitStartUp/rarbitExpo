import { Button,TouchableOpacity,Text,TextInput,View } from "react-native";

export function ButtonYo(){
    return(
        <View className="flex flex-col w-4/5 justify-center items-center">
            <TouchableOpacity
              className="w-full border border-red-300"
            >
               <Text>Hi</Text>
            </TouchableOpacity>
            <TextInput
                height={50}
                // width={300}
                // midWith='100%'
                width='100%'
                borderWidth={1}
                borderRadius={10}
                placeholder="Paste Your Youtube Link"
                className="my-2 py-2 px-4 border border-gray-300"
            /> 
        </View>
    )
}

// import React from "react";
// import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

// export function ButtonYo() {
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button}>
//         <Text>Hi</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     width: "80%",
//     alignItems: "center",
//   },
//   button: {
//     height: 100,
//     width: "100%",
//     borderWidth: 1,
//     borderColor: "red",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
