
import * as express from "express";
import { CategoryController } from "../controller/category.controller";

const Router = express.Router();
const categoryController = new CategoryController();
const {createCategorySchema,updateCategorySchema} = require("../middleware/schemas/category.schema");
const validateInformation = require("../middleware/validation");


Router.post(
    "/categoryCreate",
    validateInformation(createCategorySchema),
    categoryController.save
    );
    
Router.get(
    "/categoryByText",
    categoryController.findByTexto
    );

    Router.get(
    "/categoryById/:id",
    categoryController.findById
    );

    Router.get(
    "/categories",
    categoryController.getAll
    );

    Router.put(
    "/categoryUpdate",
    validateInformation(updateCategorySchema),
    categoryController.update
    )

    Router.delete(
    "/categoryDelete/:id",
    categoryController.delete
    )
    export { Router as categoryRouter };