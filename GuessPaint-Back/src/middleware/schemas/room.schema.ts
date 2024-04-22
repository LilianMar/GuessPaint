import { create } from "domain";

const Joi= require('joi');
module.exports={
    createRoomSchema: Joi.object().keys({
        title: Joi.string().max(15).required(),
        category_id: Joi.string().required(),
        progress: Joi.string().max(12).required()
    }),
    updateRoomSchema: Joi.object().keys({
        title: Joi.string().max(15).required(),
        category_id: Joi.string().required(),
        progress: Joi.string().max(12).required()
    }),

}