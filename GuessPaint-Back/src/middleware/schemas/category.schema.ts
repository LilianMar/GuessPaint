import { create } from "domain";

const Joi= require('joi');
module.exports={
    createCategorySchema: Joi.object().keys({
        title: Joi.string().max(15).required()
    }),
    updateCategorySchema: Joi.object().keys({
        title: Joi.string().max(15).required()
    }),
}