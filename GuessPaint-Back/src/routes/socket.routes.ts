import { SocketController } from  '../controller/socket.controller';
import { WebSocket } from 'ws';
import expressWs from 'express-ws';



const socketController = new SocketController();

export const websocketRouter = (path: string, app, expressWsInstance:expressWs.Instance) => {
    expressWsInstance.applyTo(app);

    app.ws(`${ path }/room/:id`, (ws, req) => {
        const idRoom = parseInt(req.params.id);
        const userName = String(req.headers.username);

        handleSocketConnection(ws, idRoom, userName);
    });

    return app;
};

const handleSocketConnection = ( ws: WebSocket, idRoom: number, userName: string) => {
    socketController.joinRoom(ws, idRoom, userName );
    socketController.sendMessageToRoom( ws,idRoom, `${ userName } has joined`);

    ws.on('message', async (msg: string) => {
        handleIncomingMessage( ws,idRoom, userName, msg);
    });

    ws.on('close', () => {
        socketController.leaveRoom(ws,idRoom);
        socketController.sendMessageToRoom( ws,idRoom, `${ userName } has left the room`);
    });
}

const handleIncomingMessage = (ws: WebSocket, idRoom: number, userName: string, msg: string ) => {
    let jsonMessage: { type: string, data?: any };
    
    try {
        jsonMessage = JSON.parse(msg);
    } catch(error) {
        socketController.sendMessageToUser(ws, idRoom, "ivalid message format");
        return;
    }

    switch (jsonMessage.type) {
        case 'SEND_MESSAGE':
            console.log(jsonMessage.type);
            console.log(jsonMessage.data);
            if (!jsonMessage.data) {
                socketController.sendMessageToUser(ws, idRoom, "data is required");
                return;
            }
            socketController.sendMessageToRoom(ws,idRoom, `${ userName } says: ${ jsonMessage.data }`);
            break;
        case 'START_TURN':
            socketController.startTurnInRoom(ws, idRoom);
            socketController.sendMessageToRoom(ws, idRoom, `${ userName } has started turn`);
            break;
        case 'FINISH_TURN':
            socketController.sendMessageToRoom(ws, idRoom, `${ userName } has finished turn`);
            break;
        default:
            socketController.sendMessageToUser(ws,idRoom, "invalid message type");
            return;
    }
}
