
import * as express from "express";
import { WordController } from "../controller/word.controller";
import { Word } from "../entity/Word.entity";

const Router = express.Router();
const wordController = new WordController();
const {createWordSchema,updateWordSchema} = require("../middleware/schemas/word.schema");
const validateInformation = require("../middleware/validation");

Router.get(
    "/word",
    wordController.getByTexto
    );

    Router.get(
    "/word/:id",
    wordController.getById
    );

    Router.get(
    "/words",
    wordController.getAll
    );

    Router.post(
    '/word',
    validateInformation(createWordSchema),
    wordController.save
    );

    Router.put(
    "/word",
    validateInformation(updateWordSchema),
    wordController.update
    )

    Router.delete(
    "/word/:id",
    wordController.delete
    )
    export { Router as wordRouter };