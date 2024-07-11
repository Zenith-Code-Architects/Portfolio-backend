import { experience } from "../controllers/experience.js";
import { Router } from "express";

export const experienceRouter = Router();

experienceRouter.post('/user/experiences', experience)