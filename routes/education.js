import { addEducation, deleteEducation, getEducation, updateEducation } from "../controllers/education.js";
import { Router } from "express";

export const educationRouter = Router();

educationRouter.post('/user/educations', addEducation)

educationRouter.get('/user/educations', getEducation)

educationRouter.get('/user/educations/:id', getEducation)

educationRouter.patch('/user/educations/:id', updateEducation)

educationRouter.delete('/user/educations/:id', deleteEducation)