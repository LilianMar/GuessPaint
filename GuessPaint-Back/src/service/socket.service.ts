import { WebSocket } from 'ws';
import { RoomRepository } from '../repository/room.repository';
import { CategoryRepository } from '../repository/category.repository';

interface Player {
    ws: WebSocket;
    userName: string;
    userAvatar: string;
    userScore: number;
}

export class SocketService {
    private rooms: { [key: number]: Set<Player> } = {};
    private wordInRound: { [key: number]: string } = {};
    private roundNumber: number = 3;
    private usersMax: number = 5;
    private settings: { [key: number]: any } = {};
    private roomRepository: RoomRepository;
    private categoryRepository: CategoryRepository;

    constructor() {
        this.roomRepository = new RoomRepository();
        this.categoryRepository = new CategoryRepository();
    }

    public joinRoom = (ws: WebSocket, id: number, userName: string, userAvatar: string, userScore: number): void => {
        if (!userName || !userAvatar) {
            ws.send(JSON.stringify({ error: "User name or user avatar not provided" }));
            ws.close();
            return;
        }

        if (!this.rooms[id] && this.roomRepository.findById(id)) {
            this.rooms[id] = new Set<Player>();
        }

        if (this.rooms[id].size >= this.usersMax) {
            ws.send(JSON.stringify({ error: "Room is full" }));
            ws.close();
            return;
        }

        for (let client of this.rooms[id]) {
            if (client.userName === userName) {
                ws.send(JSON.stringify({ error: "User name already in use" }));
                ws.close();
                return;
            }
        }

        const newUser: Player = { ws, userName, userAvatar, userScore };
        this.rooms[id].add(newUser);
        this.sendMessageToRoom(ws, id, `${userName} has joined the room.`);
        this.roomConfig(id);
    }

    public leaveRoom = (ws: WebSocket, id: number, userName: string, userAvatar: string, userScore: number): void => {
        if (this.rooms[id] && this.roomRepository.findById(id)) {
            let playerToRemove: Player | undefined;
            
            for (let client of this.rooms[id]) {
                if (client.userName === userName && client.userAvatar === userAvatar && client.userScore === userScore) {
                    client.ws.close();
                    playerToRemove = client;
                    break;
                }
            }
    
            if (playerToRemove) {
                this.rooms[id].delete(playerToRemove);
                this.settings[id].currentPlayers = this.settings[id].currentPlayers.filter(p => p !== playerToRemove);
                this.settings[id].finishedPlayers = this.settings[id].finishedPlayers.filter(p => p !== playerToRemove);
                this.sendMessageToRoom(ws, id, `${userName} has left the room.`);
            }
    
            if (this.rooms[id].size === 0) {
                this.closeRoom(id);
            }
        }
    }
    

    public sendMessageToRoom = (ws: WebSocket, id: number, message: string): void => {
        if (this.rooms[id] && this.roomRepository.findById(id)) {
            for (let client of this.rooms[id]) {
                if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                    client.ws.send(message);
                }
            }
        }
    }

    public sendMessageToUser = (ws: WebSocket, id: number, message: string): void => {
        if (this.rooms[id] && this.roomRepository.findById(id)) {
            for (let client of this.rooms[id]) {
                if (client.ws === ws) {
                    client.ws.send(message);
                }
            }
        }
    }

    private roomConfig = (id: number): void => {
        if (!this.settings[id] && this.rooms[id].size >= 2) {
            this.settings[id] = {
                passedRounds: 0,
                currentPlayers: Array.from(this.rooms[id]),
                finishedPlayers: [],
                drawnWords: [],
                winners: [],
                scoreToSum: [40, 30, 20]
            };
        }
    }
    

    public startTurnInRoom = async (ws: WebSocket, id: number): Promise<void> => {
        const room = await this.roomRepository.findById(id);
    
        if (this.rooms[id] && room) {
            const category = await this.categoryRepository.findById(room.categoryId);
            const words = category.words;
    
            while (this.settings[id].drawnWords.length < words.length) {
                const randomIndex = Math.floor(Math.random() * words.length);
                const selectedWord = words[randomIndex].texto;
    
                if (!this.settings[id].drawnWords.includes(selectedWord)) {
                    this.settings[id].drawnWords.push(selectedWord);
                    this.sendMessageToUser(ws, id, `It is your turn to draw: ${selectedWord}`);
                    this.sendMessageToRoom(ws, id, `The word has been selected.`);
                    this.wordInRound[id] = selectedWord;
                    break;
                }
            }
    
            const nextPlayerWs = this.assignTurnInRoom(ws, id);
            if (nextPlayerWs) {
                this.sendMessageToUser(nextPlayerWs, id, `It is your turn to draw: ${this.wordInRound[id]}`);
            }
    
            if (this.settings[id].passedRounds === this.roundNumber) {
                this.sendMessageToRoom(ws, id, `The game has been finished.`);
                this.closeRoom(id);
            }
        }
    }
    
    public closeRoom = (idRoom: number): void => {
        if (this.rooms[idRoom]) {
            for (let client of this.rooms[idRoom]) {
                client.ws.close();
            }
            delete this.rooms[idRoom];
            delete this.settings[idRoom];
        }
    }

    public assignTurnInRoom = (ws: WebSocket, id: number): WebSocket | undefined => {
        if (!this.settings[id]) {
            this.roomConfig(id);
        }
    
        const settings = this.settings[id];
    
        if (settings.currentPlayers.length === 0) {
            settings.passedRounds++;
            settings.currentPlayers = settings.finishedPlayers;
            settings.finishedPlayers = [];
            this.showPlayerScore(id);
        }
    
        const playerTurnAssigned = settings.currentPlayers.shift();
        if (playerTurnAssigned) {
            settings.finishedPlayers.push(playerTurnAssigned);
    
            let wsSelected: WebSocket | undefined;
            for (let client of this.rooms[id]) {
                if (client.userName === playerTurnAssigned.userName) {
                    wsSelected = client.ws;
                    break;
                }
            }
            return wsSelected;
        }
    }
    

    public guessWord = async (ws: WebSocket, id: number, word: string, userName: string, userAvatar: string, userScore: number): Promise<void> => {
        if (this.rooms[id] && this.roomRepository.findById(id)) {
            if (this.wordInRound[id] === word) {
                let playerFound: Player | undefined;
                for (let client of this.rooms[id]) {
                    if (client.userName === userName) {
                        playerFound = client;
                        break;
                    }
                }
    
                if (playerFound && !this.settings[id].winners.includes(userName)) {
                    const rewardIndex = this.settings[id].winners.length;
                    const reward = this.settings[id].scoreToSum[rewardIndex] || 0;
                    playerFound.userScore += reward;
                    this.settings[id].winners.push(userName);
    
                    this.sendMessageToRoom(ws, id, `${userName} has guessed the word.`);

                    if (this.settings[id].winners.length === this.rooms[id].size-2) {
    
                        await this.startTurnInRoom(ws, id); // Reiniciar el turno y asignar al siguiente jugador
                    }
                }
            } else {
                let playerHasGuessed = this.settings[id].winners.includes(userName);
                if (!playerHasGuessed) {
                    this.sendMessageToRoom(ws, id, `${userName} says: ${word}.`);
                } else {
                    ws.send(JSON.stringify({ message: "You have already guessed the word and cannot send messages." }));
                }
            }
        }
    }

    public showPlayerScore = (id: number): void => {
        if (this.rooms[id] && this.roomRepository.findById(id)) {
            const podium = Array.from(this.rooms[id])
                .sort((a, b) => b.userScore - a.userScore);

            console.log(`Podium in the room ${id}:`);
            podium.forEach(player => {
                console.log(`${player.userName} - Score: ${player.userScore}`);
            });
        } else {
            console.log(`the room with id ${id} doesn't exist`);
        }
    }
    
}
