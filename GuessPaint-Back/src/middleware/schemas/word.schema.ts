import { create } from "domain";

const Joi= require('joi');
module.exports={
    createWordSchema: Joi.object().keys({
        texto: Joi.string()
        .min(3)
        .max(15)
        .required()
    }),
    updateWordSchema: Joi.object().keys({
        texto: Joi.string()
        .min(3)
        .max(15)
        .required()
    }),
}