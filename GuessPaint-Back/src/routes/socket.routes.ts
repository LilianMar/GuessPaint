/*import { SocketController } from  '../controller/socket.controller';
import express from 'express-ws';
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
    });
}

const handleIncomingMessage = (ws: WebSocket, idRoom: number, userName: string, msg: string ) => {
    let jsonMessage: { type: string, data?: any };
    
    try {
        jsonMessage = JSON.parse(msg);
    } catch(error) {
        socketController.sendMessageToUser(ws, idRoom, "MESSAGE_NOT_VALID");
        return;
    }

    switch (jsonMessage.type) {
        case 'SEND_MESSAGE':
            if (!jsonMessage.data) {
                socketController.sendMessageToUser(ws, idRoom, "DATA_IS_EMPTY");
                return;
            }
            socketController.sendMessageToRoom(ws,idRoom, `${ userName } says: ${ jsonMessage.data }`);
            break;
        case 'START_TURN':
            socketController.startTurnInRoom(ws, idRoom);
            socketController.sendMessageToRoom(ws, idRoom, `${ userName } has started their turn`);
            break;
        case 'FINISH_TURN':
            socketController.sendMessageToRoom(ws, idRoom, `${ userName } has finished their turn`);
            break;
        default:
            socketController.sendMessageToUser(ws,idRoom, "UNKNOWN_MESSAGE_TYPE");
            return;
    }
}
---------------------------------------------------------------------------------------------------------------------
*/

import { RoomRepository } from "../repository/room.repository";

const express = require('express');
const router = express.Router();
module.exports = (expressWs) => {
    
    const roomRepository = new RoomRepository();
    expressWs.applyTo(router);

    const rooms = {};

    router.ws('/room/:roomId', (ws, req) => {
        console.log('User connected');
        const roomId = parseInt(req.params.roomId);
        const userName = req.headers.username;
        if (!rooms[roomId]) {
            rooms[roomId] = new Set();
        }
        rooms[roomId].add({ws, userName});
        //Notificar a todos que me uní
        if (rooms[roomId]) {
            rooms[roomId].forEach(client => {
                if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                  console.log(ws.OPEN);
                    client.ws.send(`${userName} has joined`);
                }
            });
        }
        ws.on('message', async function(msg) {
            const jsonMessage: {type: string, data: any} = JSON.parse(msg);
            if(jsonMessage.type === 'SEND_MESSAGE'){
                if (rooms[roomId]) {
                    rooms[roomId].forEach(client => {
                        if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                          console.log(ws.OPEN);
                            client.ws.send(`${userName} Says: ${jsonMessage.data}`);
                        }
                    });
                }
            }if(jsonMessage.type === 'FINISH_TURN'){
                const songs = await roomRepository.getAll();
                if (rooms[roomId]) {
                    rooms[roomId].forEach(client => {
                        if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                          console.log(ws.OPEN);
                            client.ws.send(JSON.stringify(songs));
                        }
                    });
                }
            }
            
        });
        ws.on('close', function() {
            rooms[roomId].delete(ws);
            if (rooms[roomId].size === 0) {
                delete rooms[roomId];
            }
        });
    });

    return router;
};
