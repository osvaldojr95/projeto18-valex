import Joi from "joi";

const blockCardSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
    password: Joi.string()
        .length(4)
        .pattern(/^[0-9]/)
        .required(),
});

export default blockCardSchema;
