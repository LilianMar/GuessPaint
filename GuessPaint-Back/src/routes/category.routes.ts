
import * as express from "express";
import { CategoryController } from "../controller/category.controller";

const Router = express.Router();
const categoryController = new CategoryController();
const {createCategorySchema,updateCategorySchema} = require("../middleware/schemas/category.schema");
const validateInformation = require("../middleware/validation");

Router.get(
    "/category",
    categoryController.getByTexto
    );

    Router.get(
    "/category/:id",
    categoryController.getById
    );

    Router.get(
    "/categories",
    categoryController.getAll
    );

    Router.post(
    "/category",
    validateInformation(createCategorySchema),
    categoryController.save
    );

    Router.put(
    "/category",
    validateInformation(updateCategorySchema),
    categoryController.update
    )

    Router.delete(
    "/category/:id",
    categoryController.delete
    )
    export { Router as categoryRouter };