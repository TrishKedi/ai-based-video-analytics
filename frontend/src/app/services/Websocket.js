import { io } from "socket.io-client"
const socket = io('http://localhost:8000', {
    transports: ["websocket"],
    reconnectionAttempts: 5,  // Limits reconnection attempts
    forceNew: true,  // Forces new connection instead of reusing an old one
});

export const listenForUpdates = (callback) =>{
    
    socket.on("progress", callback);
};

export const disconnectSocket = () => {
    if (socket.connected) {
        socket.disconnect();
        console.log("WebSocket disconnected");
    }
};