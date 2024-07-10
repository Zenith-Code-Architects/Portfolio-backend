import { skills } from "../controllers/skills.js";
import { Router } from "express";

export const skillRouter = Router();

skillRouter.post('/user/skills', skills)