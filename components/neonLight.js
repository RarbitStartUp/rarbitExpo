import React from "react";
import { View } from "react-native";

export const NeonLight = ({isWebSocketOpen})=>{
    return(
        <View style={{
            // flex:1,
           width:40,
           height:20,
           borderRadius:20,
        //    backgroundColor:'#454545',
           justifyContent:'center',
           alignItems:'start',
           padding:10,
        }}>
            <View style={{
                 width: 7,
                 height:7,
                 backgroundColor: isWebSocketOpen ? '#dab4ba' : '#e2e2e2',
                 borderRadius:10,
                //  shadowColor: isWebSocketOpen ? '#dab4ba' : '#e2e2e2' ,
                //  shadowOpacity: isWebSocketOpen ? 1 : 0,
                //  shadowOffset:{width:1 ,height:1},
                //  shadowRadius: 5,
                //  elevation: 5, // Needed for Android
            }}
            >
            <View style={{
                 width: 7,
                 height:7,
                 backgroundColor: isWebSocketOpen ? '#dab4ba' : '#e2e2e2',
                 borderRadius:10,
                //  shadowColor: isWebSocketOpen ? '#dab4ba' : '#e2e2e2',
                //  shadowOpacity: isWebSocketOpen ? 1 : 0,
                //  shadowOffset:{width:-1 ,height:-1},
                //  shadowRadius:5,
                //  elevation: 5, // Needed for Android
            }}
            >
            </View>
            </View>
        </View>
    )
}