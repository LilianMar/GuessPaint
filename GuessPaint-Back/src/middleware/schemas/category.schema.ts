import { create } from "domain";

const Joi= require('joi');
module.exports={
    createCategorySchema: Joi.object().keys({
        title: Joi.string()
        .min(3)
        .max(15)
        .required()
    }),
    updateCategorySchema: Joi.object().keys({
        id: Joi.number()
        .required(),
        title: Joi.string()
        .min(3)
        .max(15)
        .required()
    }),
}