
import * as express from "express";
import { WordController } from "../controller/word.controller";


const Router = express.Router();
const wordController = new WordController();
const {createWordSchema,updateWordSchema} = require("../middleware/schemas/word.schema");
const validateInformation = require("../middleware/validation");

Router.get(
    "/wordByText",
    wordController.findByTexto
    );

    Router.get(
    "/wordById/:id",
    wordController.findById
    );

    Router.get(
    "/words",
    wordController.getAll
    );

    Router.post(
    '/wordCreate',
    validateInformation(createWordSchema),
    wordController.save
    );

    Router.put(
    "/wordUpdate",
    validateInformation(updateWordSchema),
    wordController.update
    )

    Router.delete(
    "/wordDelete/:id",
    wordController.delete
    )
    export { Router as wordRouter };