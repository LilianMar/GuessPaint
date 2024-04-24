import * as express from 'express';
import { WordCategoryController } from '../controller/wordCategory.controller';

const Router = express.Router();
const wordCategoryController = new WordCategoryController();
const {createWordCategorySchema} = require('../middleware/schemas/wordCategory.schema');
const validateInformation = require('../middleware/validation');


Router.get(
    '/wordCategoryId',
    wordCategoryController.getByCategoryId
);

Router.get(
    '/wordsCategories',
    wordCategoryController.getAll
);

Router.post(
    '/wordCategory',
    validateInformation(createWordCategorySchema),
    wordCategoryController.save
);

Router.delete(
    '/wordCategory/:id',
    wordCategoryController.delete
);

export { Router as wordCategoryRouter };

