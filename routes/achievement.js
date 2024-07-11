import { achievements } from "../controllers/achievements.js";
import { Router } from "express";

export const achievementRouter = Router();

achievementRouter.post('/user/achievements', achievements)