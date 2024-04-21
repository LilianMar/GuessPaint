
import * as express from "express";
import { WordController } from "../controller/word.controller";

const Router = express.Router();
const wordController = new WordController();
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
    "/word",
    wordController.save
    );

    Router.put(
    "/word",
    wordController.update
    )

    Router.delete(
    "/word/:id",
    wordController.delete
    )
    export { Router as wordRouter };