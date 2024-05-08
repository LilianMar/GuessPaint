/*
---------------------------------------------------------------------------------------------------------------------


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
*/
