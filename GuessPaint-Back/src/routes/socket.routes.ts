import { SocketController } from '../controller/socket.controller';
import { WebSocket } from 'ws';
import expressWs from 'express-ws';

const socketController = new SocketController();

export const websocketRouter = (path: string, app, expressWsInstance: expressWs.Instance) => {
    expressWsInstance.applyTo(app);

    app.ws(`${path}/room/:id`, (ws, req) => {
        const idRoom = parseInt(req.params.id);
        const userName = String(req.headers.username);
        const userAvatar = String(req.headers.userAvatar);
        const userScore = 0;

        handleSocketConnection(ws, idRoom, userName, userAvatar, userScore);
    });

    return app;
};

const handleSocketConnection = (ws: WebSocket, id: number, userName: string, userAvatar: string, userScore: number) => {
    socketController.joinRoom(ws, id, userName, userAvatar, userScore);

    ws.on('message', async (msg: string) => {
        await handleIncomingMessage(ws, id, userName, msg, userAvatar, userScore);
    });

    ws.on('close', () => {
        socketController.leaveRoom(ws, id, userName, userAvatar, userScore);
    });
};

const handleIncomingMessage = async (ws: WebSocket, id: number, userName: string, msg: string, userAvatar: string, userScore: number) => {
    let jsonMessage: { type: string, data?: any };

    try {
        jsonMessage = JSON.parse(msg);
    } catch (error) {
        socketController.sendMessageToUser(ws, id, "Invalid message format");
        return;
    }

    switch (jsonMessage.type) {
        case 'SEND_MESSAGE':
            if (!jsonMessage.data) {
                socketController.sendMessageToUser(ws, id, "Data is required");
                return;
            }
            socketController.guessWord(ws, id, jsonMessage.data, userName, userAvatar, userScore);
            console.log(jsonMessage.data);
            break;

        case 'START_TURN':
            await socketController.startTurnInRoom(ws, id);
            break;


        case 'LEAVE_ROOM':
            socketController.leaveRoom(ws, id, userName, jsonMessage.data.userAvatar, jsonMessage.data.userScore);
            break;   
            
        default:
            socketController.sendMessageToUser(ws, id, "Invalid message type");
            return;
    }
};
