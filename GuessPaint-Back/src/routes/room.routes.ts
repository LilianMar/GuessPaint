import * as express from 'express';
import { RoomController } from '../controller/room.controller';
import e = require('express');

const Router = express.Router();
const roomController = new RoomController();
const {createRoomSchema,updateRoomSchema} = require('../middleware/schemas/room.schema');
const validateInformation = require('../middleware/validation');


Router.get(
    '/room/:id',
    roomController.getById
);


Router.get(
    '/room/words',
    roomController.getWordsByRoom
);

Router.get(
    '/rooms',
    roomController.getAll
);

Router.post(
    '/room',
    validateInformation(createRoomSchema),
    roomController.save
);

Router.delete(
    '/room/:id',
    roomController.delete
);

export { Router as roomRouter };