import Joi from "joi";

const paymentSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
    password: Joi.string()
        .length(4)
        .pattern(/^[0-9]/)
        .required(),
    idBusiness: Joi.number().integer().positive().required(),
    value: Joi.number().positive().required(),
});

export default paymentSchema;
