import { addEducation, deleteEducation, getEducation, updateEducation } from "../controllers/education.js";
import { Router } from "express";

export const educationRouter = Router();

educationRouter.post('/educations', addEducation)

educationRouter.get('/educations', getEducation)

educationRouter.get('/educations/:id', getEducation)

educationRouter.patch('/educations/:id', updateEducation)

educationRouter.delete('/educations/:id', deleteEducation)