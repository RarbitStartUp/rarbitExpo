import React, { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

const WebSocketContext = createContext();

const getWebSocketURL = () => {
    // Define WebSocket URLs for different environments or platforms
    // For example, you might have different URLs for development, staging, and production environments
    // const developmentUrl = 'http://localhost:3001'; // Change to your server URL
    const developmentUrl = 'http://192.168.0.168:3001'; // Wenny's Wifi
    // const developmentUrl = 'http://172.20.10.1'; // Wenny's iPhone 15 Wifi
    // const developmentUrl = 'http://192.168.19.163:3001'; // Somewhere Meeting Room wifi
    const productionUrl = 'https://rarbit.tech';

    // Determine the environment or platform where the app is running
    // For React Native, you might use platform-specific APIs or environment variables
    // For simplicity, let's assume a variable indicating the development environment
    // const isDevelopment = process.env.NODE_ENV === 'development';
    const isDevelopment = __DEV__;

    // Return the appropriate WebSocket URL based on the environment
    return isDevelopment ? developmentUrl : productionUrl;
};

export const WebSocketProvider = ({ children }) => {
    const socketUrl = getWebSocketURL();
    console.log("socketUrl:", socketUrl);

    // Use state to manage the WebSocket instance and its connection status
    const [socket, setSocket] = useState(null);
    const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);

    useEffect(() => {
        const initWebSocket = () => {
            const socket = io(socketUrl);

            socket.on('connect', () => {
                console.log('WebSocket connection opened successfully');
                setIsWebSocketOpen(true);
            });

            socket.on('disconnect', () => {
                console.log('WebSocket connection closed');
                setIsWebSocketOpen(false);
            });

            socket.on('reconnect_attempt', () => {
                console.log('Attempting to reconnect to WebSocket');
            });

            socket.on('reconnect', () => {
                console.log('Reconnected to WebSocket');
            });

            setSocket(socket);
        };

        initWebSocket();

        // Clean up the WebSocket instance and event listeners when the component is unmounted
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [socketUrl]);

    return (
        <WebSocketContext.Provider value={{socket, isWebSocketOpen}}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};
