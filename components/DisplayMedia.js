import React, { useRef, useState, useEffect } from 'react';
import { View,Modal,PanResponder, TouchableWithoutFeedback, Text, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Image } from 'expo-image';
import  LottieView  from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const DisplayMedia = ({ photoUri, videoUri}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalPosition, setModalPosition] = useState(0);
    const [panResponder, setPanResponder] = useState(null);
    const [status, setStatus] = useState({});

    const video = useRef(null);
//     const blurhash =
//   '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    if(videoUri){
        console.log("videoUri:",videoUri);
    }
    if(photoUri){
        console.log("photoUri:",photoUri);
    }

    useEffect(() => {
        const responder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                setModalPosition(gestureState.dy);
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dy > 50) {
                    setModalVisible(false); // Dismiss modal if swiped down beyond 100 pixels
                } else {
                    setModalPosition(0); // Reset modal position if not swiped down enough
                }
            },
        });
        setPanResponder(responder);

        return () => {
            // Clean up the PanResponder when component unmounts
            setPanResponder(null);
        };
    }, []);

    const enlargeMedia = () => {
        setModalPosition(0); // Reset modal position
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={enlargeMedia}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {photoUri && (
                        <Image source={{ uri: photoUri }} style={{ width:50, height:65, borderWidth:2, borderColor:'white', borderRadius:10 }}/>
                    )}
                    { videoUri && (
                        <Video
                            ref={video}
                            source={{ uri: videoUri }}
                            style={{ width:50, height:65, borderWidth:2, borderColor:'white', borderRadius:10 }} 
                            resizeMode={ResizeMode.CONTAIN}
                            // shouldPlay={true}
                            // isLooping={false}
                            // onPlaybackStatusUpdate={status => setStatus(() => status)}
                        />
                    )}
                </View>
            </TouchableWithoutFeedback>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Dragging modal down */}
                    <View
                        style={{ transform: [{ translateY: modalPosition }] }}
                        {...(panResponder ? panResponder.panHandlers : {})}
                    >
                    {photoUri && (
                        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}>
                        <Image 
                        source={{ uri: photoUri }} 
                        style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }} 
                        contentFit="contain"
                        // placeholder={{blurhash}}
                        // transition={1000}
                         />
                         </View>
                    )}
                    {videoUri && (
                        <>
                        <Video
                            ref={video}
                            source={{ uri: videoUri }}
                            style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }} 
                            resizeMode={ResizeMode.CONTAIN}
                            useNativeControls
                            shouldPlay={true}
                            isLooping
                            onPlaybackStatusUpdate={status => setStatus(() => status)}
                        />
                        {/* <View style={{ flex: 1, position: 'absolute', bottom: 400, left: 0, right: 0, alignItems: 'center' }}>
                            <TouchableOpacity 
                            style={{ opacity: 0.5 }}
                            onPress={() =>
                                    status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()}
                            >
                            { status.isPlaying ?(
                                <Foundation name="pause" size={50} color="#ffffff"/>
                            ):(
                                <Ionicons name="play" size={50} color="#ffffff"/>
                            )}
                            </TouchableOpacity>
                        </View> */}
                    </>
                    )}
                    {/* <TouchableOpacity className="absolute top-10 left-5"onPress={closeModal}>
                          <Entypo name="cross" size={30} color="#ffffff" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3, elevation: 5 }} />
                    </TouchableOpacity> */}
                    {/* <View className="flex-1 absolute">
                          <Text className="text-white relative bottom-10 w-full flex items-center">Swipe down to dismiss</Text>
                    </View> */}
                    <View style={{ flex: 1, position: 'absolute', bottom: 50, left: 0, right: 0, alignItems: 'center' }}>
                        <Text className="text-white font-semibold">Swipe down to dismiss</Text>
                        <LottieView
                                autoPlay={true}
                                style={{ width: 50, height: 50 }} // Adjust width and height as needed
                                source={require('../assets/downArrow.json')} // Replace 'path_to_tick_animation.json' with the actual path to your Lottie JSON file
                                loop={true}
                            />
                    </View>

                          {/* <Text style={{ position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -80 }, { translateY: 350 }], color: '#ffffff' }}>Swipe down to dismiss</Text> */}
                          {/* <Text style={{ position: 'absolute', bottom: 10, textAlign: 'center', color: '#ffffff' }}>Swipe down to dismiss</Text> */}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

