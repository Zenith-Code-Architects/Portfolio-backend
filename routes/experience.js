import { addExperience, deleteExperience, getExperience, updateExperience } from "../controllers/experience.js";
import { Router } from "express";
import { checkUserSession } from "../middleware/auth.js";

export const experienceRouter = Router();

experienceRouter.post('/experiences',checkUserSession, addExperience)

experienceRouter.get('/experiences', getExperience)

experienceRouter.patch('/experiences/:id', updateExperience)

experienceRouter.delete('/experiences/:id',checkUserSession, deleteExperience)