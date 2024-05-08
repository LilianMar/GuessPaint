import { WebSocket } from 'ws';
import { RoomRepository } from '../repository/room.repository';
import { CategoryRepository } from '../repository/category.repository';


export class SocketService {
    private rooms: object;
    private roomRepository: RoomRepository;
    private categoryRepository: CategoryRepository;

    constructor() {
        this.rooms = {};
        this.roomRepository = new RoomRepository();
        this.categoryRepository = new CategoryRepository();
    }

    public joinRoom = (ws: WebSocket, id: number, userName: string): void => {
        if (!userName ) {
            ws.send(JSON.stringify({ error: "user not provided "}));
            ws.close();
            return;
        } if (!this.rooms[id] && this.roomRepository.findById(id)) {
            this.rooms[id] = new Set();
            this.rooms[id].add({ ws, userName});
            console.log('User joined');
            console.log(this.rooms);
        }
        else if (this.rooms[id] && this.roomRepository.findById(id)) {
            this.rooms[id].add({ ws, userName});
            console.log('User joined');
            console.log(this.rooms);
        }
    }

    public leaveRoom = (ws: WebSocket, id: number): void => {
        if (this.rooms[id] && this.roomRepository.findById(id)) {
            this.rooms[id].delete(ws);
            if (this.rooms[id].size === 0) {
                delete this.rooms[id];
            }
        }
    }

    public sendMessageToRoom = (ws: WebSocket, id: number, message: string): void => {
        if (this.rooms[id] && this.roomRepository.findById(id)) {
            this.rooms[id].forEach(client => {
                if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                    client.ws.send(message);
                }
            });
        }
    }



    public startTurnInRoom = async (ws: WebSocket, id: number): Promise<void> => {
        const room = await this.roomRepository.findById(id);

        if (this.rooms[id] && room) {
            const category = await this.categoryRepository.findById(room.categoryId);
            const words = category.words;
            const randomIndex = Math.floor(Math.random() * words.length);
            const selectedWord = words[randomIndex].texto;

            this.sendMessageToUser( ws, id, `Is your turn to draw: ${ selectedWord }`);
        }
    }

    public sendMessageToUser = (ws: WebSocket, id: number, message: string): void => {
        if (this.rooms[id] && this.roomRepository.findById(id)) {
            this.rooms[id].forEach(client => {
                if (client.ws === ws) {
                    client.ws.send(message);
                }
            });
        }
    }
}