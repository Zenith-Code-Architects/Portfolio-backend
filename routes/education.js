import { addEducation, deleteEducation, getEducation, updateEducation } from "../controllers/education.js";
import { Router } from "express";
import { checkUserSession } from "../middleware/auth.js";

export const educationRouter = Router();

educationRouter.post('/educations',checkUserSession, addEducation)

educationRouter.get('/educations', getEducation)

educationRouter.patch('/educations/:id', updateEducation)

educationRouter.delete('/educations/:id',checkUserSession, deleteEducation)