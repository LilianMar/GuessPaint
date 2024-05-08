/*import { SocketService } from '../service/socket.service';
import { WebSocket } from 'ws';

export class SocketController {
    private socketService: SocketService;

    constructor() {
        this.socketService = new SocketService();
    }

    public joinRoom = (ws: WebSocket, id: number, userName: string) => {
        this.socketService.joinRoom(ws, id, userName);
    }

    public leaveRoom = (ws: WebSocket, id: number) => {
        this.socketService.leaveRoom(ws, id);
    }

    public sendMessageToRoom = (ws: WebSocket, id: number, message: string) => {
        this.socketService.sendMessageToRoom(ws, id, message);
    }

    public startTurnInRoom = (ws: WebSocket, id: number) => {
        this.socketService.startTurnInRoom(ws, id);
    }

    public sendMessageToUser = (ws: WebSocket, id: number, message: string) => {
        this.socketService.sendMessageToUser(ws, id, message);
    }
}
---------------------------------------------------------------------------------------------------------------------
*/

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