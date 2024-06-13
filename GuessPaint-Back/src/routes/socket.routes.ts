import { SocketController } from '../controller/socket.controller';
import { WebSocket } from 'ws';
import expressWs from 'express-ws';

const socketController = new SocketController();

export const websocketRouter = (path: string, app, expressWsInstance: expressWs.Instance) => {
    expressWsInstance.applyTo(app);

    app.ws(`${path}/room/:idRoom/:userName/:userAvatar`, (ws, req) => {
        const idRoom = parseInt(req.params.idRoom);
        const userName = String(req.params.userName);
        const userAvatar = String(req.params.userAvatar);
        const userScore = 0;

        handleSocketConnection(ws, idRoom, userName, userAvatar, userScore);
    });

    return app;
};

const handleSocketConnection = (ws: WebSocket, idRoom: number, userName: string, userAvatar: string, userScore: number) => {
    socketController.joinRoom(ws, idRoom, userName, userAvatar, userScore);

    ws.on('message', async (msg: string) => {
        await handleIncomingMessage(ws, idRoom, userName, msg, userAvatar, userScore);
    });

    ws.on('close', () => {
        socketController.leaveRoom(ws, idRoom, userName, userAvatar, userScore);
    });

    ws.on('disconnect',()=> {
        socketController.leaveRoom(ws, idRoom, userName, userAvatar, userScore);
    });
};

const handleIncomingMessage = async (ws: WebSocket, idRoom: number, userName: string, msg: string, userAvatar: string, userScore: number) => {
    let jsonMessage: { type: string, data?: any };

    try {
        jsonMessage = JSON.parse(msg);
    } catch (error) {
        socketController.sendMessageToUser(ws, idRoom, "InvalidRoom message format");
        return;
    }

    switch (jsonMessage.type) {
        case 'SEND_MESSAGE':
            if (!jsonMessage.data) {
                socketController.sendMessageToUser(ws, idRoom, "Data is required");
                return;
            }
            socketController.guessWord(ws, idRoom, jsonMessage.data, userName, userAvatar, userScore);
            console.log(jsonMessage.data);
            break;

        case 'START_TURN':
            await socketController.startTurnInRoom(ws, idRoom);
            break;


        case 'LEAVE_ROOM':
            socketController.leaveRoom(ws, idRoom, userName, jsonMessage.data.userAvatar, jsonMessage.data.userScore);
            break;   
            
        default:
            socketController.sendMessageToUser(ws, idRoom, "InvalidRoom message type");
            return;
    }
};
