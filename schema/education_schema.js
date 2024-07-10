import Joi from "joi";

export const education_schema = Joi.object({
    schoolName: Joi.string().required(),
    location: Joi.string(),
    program: Joi.string(),
    qualification: Joi.string(),
    grade: Joi.string(),
    startDate: Joi.string(),
    endDate: Joi.string()
})