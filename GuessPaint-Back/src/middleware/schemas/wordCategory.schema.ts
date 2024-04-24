import { create } from "domain";

const Joi= require('joi');
module.exports={
    createWordCategorySchema: Joi.object().keys({
        word_id: Joi.string()
        .required(),
        category_id: Joi.string()
        .required()
        
    }),
    updateWordCategorySchema: Joi.object().keys({
        word_id: Joi.string()
        .required(),
        category_id: Joi.string()
        .required()
    }),

}