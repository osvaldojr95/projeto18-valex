import Joi from "joi";

const rechargeCardSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
    value: Joi.number().integer().positive().required(),
    apiKey: Joi.required(),
});

export default rechargeCardSchema;
