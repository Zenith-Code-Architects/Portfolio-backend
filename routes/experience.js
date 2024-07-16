import { addExperience, deleteExperience, getExperience, updateExperience } from "../controllers/experience.js";
import { Router } from "express";
import { checkUserSession } from "../middleware/auth.js";

export const experienceRouter = Router();

experienceRouter.post('/experiences',checkUserSession, addExperience)

experienceRouter.get('/experiences',checkUserSession, getExperience)

experienceRouter.patch('/experiences/:id',checkUserSession, updateExperience)

experienceRouter.delete('/experiences/:id',checkUserSession, deleteExperience)