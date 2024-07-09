import Joi from "joi";

export const user_schema = Joi.object({
    firstName: Joi.string()
    .min(3)
    .max(30)
    .required(),

    lastName: Joi.string()
    .min(3)
    .max(30)
    .required(),

    userName: Joi.string()
    .min(3)
    .max(20)
    .unique(),  

    email: Joi.string()
    .email()
    .unique()
    .required(), 

    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),    
    
    confirmPassword: Joi.ref('password'),

    consent: Joi.boolean().required()
})