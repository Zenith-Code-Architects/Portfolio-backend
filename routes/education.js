import { addEducation, deleteEducation, getEducation, updateEducation } from "../controllers/education.js";
import { Router } from "express";
import { checkUserSession } from "../middleware/auth.js";

export const educationRouter = Router();

educationRouter.post('/educations',checkUserSession, addEducation)

educationRouter.get('/educations',checkUserSession, getEducation)

educationRouter.patch('/educations/:id',checkUserSession, updateEducation)

educationRouter.delete('/educations/:id',checkUserSession, deleteEducation)