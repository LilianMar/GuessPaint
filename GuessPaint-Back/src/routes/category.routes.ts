
import * as express from "express";
import { CategoryController } from "../controller/category.controller";

const Router = express.Router();
const categoryController = new CategoryController();
const {createCategorySchema,updateCategorySchema} = require("../middleware/schemas/category.schema");
const validateInformation = require("../middleware/validation");

Router.get(
    "/categoryByText",
    categoryController.getByTexto
    );

    Router.get(
    "/categoryById/:id",
    categoryController.getById
    );

    Router.get(
    "/categories",
    categoryController.getAll
    );

    Router.post(
    "/categoryCreate",
    validateInformation(createCategorySchema),
    categoryController.save
    );

    Router.put(
    "/categoryUpdateBy/:id",
    validateInformation(updateCategorySchema),
    categoryController.update
    )

    Router.delete(
    "/categoryDelete/:id",
    categoryController.delete
    )
    export { Router as categoryRouter };