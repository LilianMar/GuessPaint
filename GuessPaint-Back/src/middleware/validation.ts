import * as wordSchemas from "./schemas/word.schema";
import * as categorySchemas from "./schemas/category.schema";
import * as roomSchemas from "./schemas/room.schema";
import * as wordCategorySchemas from "./schemas/wordCategory.schema";
import { Schema } from "joi";


module.exports =(wordSchemas:Schema) =>{
    return async (req, res, next) => {
        try {
            await wordSchemas.validateAsync(req.body);
            next();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    }

    module.exports =(categorySchemas:Schema) =>{
    return async (req, res, next) => {
        try {
            await categorySchemas.validateAsync(req.body);
            next();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    }

    module.exports =(wordCategorySchemas:Schema) =>{
    return async (req, res, next) => {
        try {
            await wordCategorySchemas.validateAsync(req.body);
            next();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    }

    module.exports =(roomSchemas:Schema) =>{
    return async (req, res, next) => {
        try {
            await roomSchemas.validateAsync(req.body);
            next();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    }