import { addEducation, deleteEducation, getEducation, getOneEducation, updateEducation } from "../controllers/education.js";
import { Router } from "express";
import { checkUserSession } from "../middleware/auth.js";

export const educationRouter = Router();

educationRouter.post('/educations',checkUserSession, addEducation)

educationRouter.get('/educations',checkUserSession, getEducation)

educationRouter.get('/educations/:id',checkUserSession, getOneEducation)

educationRouter.patch('/educations/:id',checkUserSession, updateEducation)

educationRouter.delete('/educations/:id',checkUserSession, deleteEducation)