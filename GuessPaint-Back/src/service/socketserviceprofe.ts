/*
---------------------------------------------------------------------------------------------------------------------

const WebSocket = require('ws');
export class SocketController{
    public static  rooms = {};

     joinRoom(ws, roomId) {
        if (!SocketController.rooms[roomId]) {
            SocketController.rooms[roomId] = new Set();
        }
        SocketController.rooms[roomId].add(ws);
        console.log('User joined');
      }
      
       leaveRoom(ws, roomId) {
        if (SocketController.rooms[roomId]) {
            SocketController.rooms[roomId].delete(ws);
          if (SocketController.rooms[roomId].size === 0) {
            delete SocketController.rooms[roomId];
          }
        }
      }
      
       sendMessageToRoom(roomId, message) {
        if (SocketController.rooms[roomId]) {
          for (const client of SocketController.rooms[roomId]) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(message);
            }
          }
        }
      }
      

    sendMessage(){
    
    }
}
*/