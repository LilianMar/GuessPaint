import { SocketService } from '../service/socket.service';
import { WebSocket } from 'ws';

export class SocketController {
    private socketService: SocketService;

    constructor() {
        this.socketService = new SocketService();
    }

    public joinRoom = (ws: WebSocket, id: number, userName: string, userAvatar: string, userScore: number) => {
        this.socketService.joinRoom(ws, id, userName, userAvatar, userScore);
    }

    public leaveRoom = (ws: WebSocket, id: number, userName: string, userAvatar: string, userScore: number) => {
        this.socketService.leaveRoom(ws, id, userName, userAvatar, userScore);
    }

    public sendMessageToRoom = (ws: WebSocket, id: number, message: string) => {
        this.socketService.sendMessageToRoom(ws, id, message);
    }

    public sendMessageToUser = (ws: WebSocket, id: number, message: string) => {
        this.socketService.sendMessageToUser(ws, id, message);
    }

    public guessWord = (ws: WebSocket, id: number, word: string, userName: string, userAvatar: string, userScore: number) => {
        this.socketService.guessWord(ws, id, word, userName, userAvatar, userScore);
    }

    public startTurnInRoom = (ws: WebSocket, id: number) => {
        this.socketService.startTurnInRoom(ws, id);
    }

    public closeRoom = (id: number) => {
        this.socketService.closeRoom(id);
    }
}
