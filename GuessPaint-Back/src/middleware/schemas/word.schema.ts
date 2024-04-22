import { create } from "domain";

const Joi= require('joi');
module.exports={
    createWordSchema: Joi.object().keys({
        texto: Joi.string().max(15).required()
    }),
    updateWordSchema: Joi.object().keys({
        texto: Joi.string().max(15).required()
    }),
}