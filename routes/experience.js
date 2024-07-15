import { addExperience, deleteExperience, getExperience, updateExperience } from "../controllers/experience.js";
import { Router } from "express";

export const experienceRouter = Router();

experienceRouter.post('/experiences', addExperience)

experienceRouter.get('/experiences', getExperience)

experienceRouter.patch('/experiences/:id', updateExperience)

experienceRouter.delete('/experiences/:id', deleteExperience)