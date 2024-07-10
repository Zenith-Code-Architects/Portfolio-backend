import Joi from "joi";

export const skills_schema = Joi.object({
    name: Joi.string().required(),
    levelOfProfiency: Joi.string()
})