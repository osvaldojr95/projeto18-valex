import Joi from "joi";

const createCardSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
    type: Joi.valid(
        "groceries",
        "restaurant",
        "transport",
        "education",
        "health"
    ).required(),
    apiKey: Joi.required(),
});

export default createCardSchema;
