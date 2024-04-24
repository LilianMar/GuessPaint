import { create } from "domain";

const Joi= require('joi');
module.exports={

    createRoomSchema: Joi.object().keys({
        title: Joi.string()
        .min(3)
        .max(15)
        .required(),
        category_id: Joi.string().
        required(),
        progress: Joi.string()
        .min(7)
        .max(12)
        .valid('Sin iniciar', 'En curso', 'Finalizado')
        .required()
    }),

    updateRoomSchema: Joi.object().keys({
        title: Joi.string()
        .min(3)
        .max(15)
        .required(),
        category_id: Joi.string()
        .required(),
        progress: Joi.string()
        .min(7)
        .max(12)
        .required()
    }),

}