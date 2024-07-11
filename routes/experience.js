import { addExperience, deleteExperience, getExperience, updateExperience } from "../controllers/experience.js";
import { Router } from "express";

export const experienceRouter = Router();

experienceRouter.post('/user/experiences', addExperience)

experienceRouter.get('/user/experiences', getExperience)

experienceRouter.get('/user/experiences/:id', getExperience)

experienceRouter.patch('/user/experiences/:id', updateExperience)

experienceRouter.delete('/user/experiences/:id', deleteExperience)