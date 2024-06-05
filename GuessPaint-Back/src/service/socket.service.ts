import { WebSocket } from 'ws';
import { RoomRepository } from '../repository/room.repository';
import { CategoryRepository } from '../repository/category.repository';

interface Player {
    ws: WebSocket;
    userName: string;
    userAvatar: string;
    userScore: number;
}

//a el ultimo que adivina no le llega el mensaje de la sala en donde se escoge al nuevo dibujante   
//cuando se completa la ronda al ultimo que adivino no se le muestra el podium
//cuando se completan las rondas se muestra e podium, se asigna un nuevo turno, se finaliza el juego, se vuelve a mostrar el podium y se cierra la sala

export class SocketService {
    private rooms: { [key: number]: Set<Player> } = {};
    private wordInRound: { [key: number]: string } = {};
    private roundNumber: number = 2;
    private usersMax: number = 4;
    private settings: { [key: number]: any } = {};
    private roomRepository: RoomRepository;
    private categoryRepository: CategoryRepository;

    constructor() {
        this.roomRepository = new RoomRepository();
        this.categoryRepository = new CategoryRepository();
    }

   
    private initializeRoomSettings(id: number): void {
        if (!this.settings[id]) {
            this.settings[id] = {
                passedRounds: 0,
                currentPlayers: [],
                finishedPlayers: [],
                drawnWords: [],
                winners: [],
                scoreToSum: [40, 30, 20, 0]
            };
        }
    }

    private findPlayer(id: number, userName: string): Player | undefined {
        return Array.from(this.rooms[id]).find(player => player.userName === userName);
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

        if (this.findPlayer(id, userName)) {
            ws.send(JSON.stringify({ error: "User name already in use" }));
            ws.close();
            return;
        }

        const newUser: Player = { ws, userName, userAvatar, userScore };
        this.rooms[id].add(newUser);

        this.initializeRoomSettings(id);

        // Add the new user to the current players list if the game has not started
        if (this.settings[id].currentPlayers.length < this.usersMax) {
            this.settings[id].currentPlayers.push(newUser);
        }

        this.sendMessageToRoom(ws, id, `${userName} has joined the room.`);
    }

    public leaveRoom = (ws: WebSocket, id: number, userName: string, userAvatar: string, userScore: number): void => {
        if (this.rooms[id] && this.roomRepository.findById(id)) {
            let playerToRemove = this.findPlayer(id, userName);

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
            this.rooms[id].forEach(client => {
                if (client.ws !== ws && client.ws.readyState === WebSocket.OPEN) {
                    client.ws.send(message);
                }
            });
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
                    this.wordInRound[id] = selectedWord;
                    break;
                }
            }

            const nextPlayerWs = this.assignTurnInRoom(ws, id);
            if (nextPlayerWs) {
                this.sendMessageToUser(nextPlayerWs, id, `It is your turn to draw: ${this.wordInRound[id]}`);
            }

            if (this.settings[id].passedRounds >= this.roundNumber) {
                this.sendMessageToRoom(ws, id, `The game has been finished.`);
                this.showPlayerScore(ws, id);
                this.closeRoom(id);
            }
        }
    }

    public closeRoom = (idRoom: number): void => {
        if (this.rooms[idRoom]) {
            this.rooms[idRoom].forEach(client => {
                client.ws.close();
            });
            delete this.rooms[idRoom];
            delete this.settings[idRoom];
        }
    }

    public assignTurnInRoom = (ws: WebSocket, id: number): WebSocket | undefined => {
        this.initializeRoomSettings(id);

        const settings = this.settings[id];

        if (settings.currentPlayers.length === 0) {
            settings.passedRounds++;
            settings.currentPlayers = settings.finishedPlayers;
            settings.finishedPlayers = [];
            this.showPlayerScore(ws, id);
        }

        const playerTurnAssigned = settings.currentPlayers.shift();
        if (playerTurnAssigned) {
            settings.finishedPlayers.push(playerTurnAssigned);

            const client = this.findPlayer(id, playerTurnAssigned.userName);
            if (client) {
                settings.currentDrawer = playerTurnAssigned.userName; // Set the current drawer
                this.sendMessageToRoom(ws, id, `The word has been selected. It is ${settings.currentDrawer}'s turn to draw.`);
                return client.ws;
            }
        }
    }

    public guessWord = async (ws: WebSocket, id: number, word: string, userName: string, userAvatar: string, userScore: number): Promise<void> => {
        if (this.rooms[id] && this.roomRepository.findById(id)) {
            if (this.wordInRound[id] === word) {
                const playerFound = this.findPlayer(id, userName);

                if (playerFound) {
                    if (userName === this.settings[id].currentDrawer) {
                        ws.send(JSON.stringify({ message: "You are the drawer and cannot guess the word." }));
                        return;
                    }

                    if (!this.settings[id].winners.includes(userName)) {
                        const rewardIndex = this.settings[id].winners.length;
                        const reward = this.settings[id].scoreToSum[rewardIndex] || 0;
                        playerFound.userScore += reward;
                        this.settings[id].winners.push(userName);

                        this.sendMessageToRoom(ws, id, `${userName} has guessed the word.`);

                        if (this.settings[id].winners.length === this.rooms[id].size - 1) {
                            await this.startTurnInRoom(ws, id);
                            this.settings[id].winners = [];
                        }
                    } else {
                        ws.send(JSON.stringify({ message: "You have already guessed the word and cannot guess again." }));
                    }
                }
            } else {
                this.sendMessageToRoom(ws, id, `${userName} says: ${word}.`);
            }
        }
    }

    public showPlayerScore = (ws: WebSocket, id: number): void => {
        if (this.rooms[id] && this.roomRepository.findById(id)) {
            const podium = Array.from(this.rooms[id])
                .sort((a, b) => b.userScore - a.userScore);
            this.sendMessageToRoom(ws, id, `---Podium in the room ${id}---`);
            podium.forEach(player => {
                this.sendMessageToRoom(ws, id, `${player.userName} - Score: ${player.userScore}`);
            });
        } else {
            console.log(`The room with id ${id} doesn't exist`);
        }
    }
}