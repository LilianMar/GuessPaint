
import * as express from "express";
import { CategoryController } from "../controller/category.controller";

const Router = express.Router();
const categoryController = new CategoryController();
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
    categoryController.save
    );

    Router.put(
    "/category",
    categoryController.update
    )

    Router.delete(
    "/category/:id",
    categoryController.delete
    )
    export { Router as categoryRouter };