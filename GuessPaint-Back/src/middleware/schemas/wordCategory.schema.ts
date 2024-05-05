import { create } from "domain";

const Joi= require('joi');
module.exports={
    createWordCategorySchema: Joi.object().keys({
        wordId: Joi.number()
        .required(),
        categoryId: Joi.number()
        .required()
        
    }),
    updateWordCategorySchema: Joi.object().keys({
        id: Joi.number()
        .required(),
        wordId: Joi.number()
        .required(),
        categoryId: Joi.number()
        .required()
    }),

}