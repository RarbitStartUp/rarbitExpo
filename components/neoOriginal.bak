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
                 backgroundColor: isWebSocketOpen ? '#11FF5C' : '#e2e2e2',
                 shadowColor: isWebSocketOpen ? '#11FF5C' : '#e2e2e2' ,
                 shadowOpacity: isWebSocketOpen ? 10 : 0,
                 shadowOffset:{width:2 ,height:2},
                 shadowRadius: 5,
                 elevation: 5, // Needed for Android
                 borderRadius:10,
            }}
            >
            <View style={{
                 width: 7,
                 height:7,
                 backgroundColor: isWebSocketOpen ? '#11FF5C' : '#e2e2e2',
                 shadowColor: isWebSocketOpen ? '#11FF5C' : '#e2e2e2',
                 shadowOpacity: isWebSocketOpen ? 10 : 0,
                 shadowOffset:{width:-2 ,height:-2},
                 shadowRadius:5,
                 elevation: 5, // Needed for Android
                 borderRadius:10,
            }}
            >
            </View>
            </View>
        </View>
    )
}