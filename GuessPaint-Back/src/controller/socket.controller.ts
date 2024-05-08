import { SocketService } from '../service/socket.service';
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
