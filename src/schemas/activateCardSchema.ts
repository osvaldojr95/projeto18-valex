import Joi from "joi";

const activateCardSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
    cvc: Joi.string()
        .length(3)
        .pattern(/^[0-9]/)
        .required(),
    password: Joi.string()
        .length(4)
        .pattern(/^[0-9]/)
        .required(),
});

export default activateCardSchema;
