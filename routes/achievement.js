import { addAchievements, deleteAchievements, getAchievements, updateAchievements } from "../controllers/achievements.js";
import { Router } from "express";

export const achievementRouter = Router();

achievementRouter.post('/user/achievements', addAchievements)

achievementRouter.get('/user/achievements', getAchievements)

achievementRouter.get('/user/achievements/:id', getAchievements)

achievementRouter.patch('/user/achievements/:id', updateAchievements)

achievementRouter.delete('/user/achievements/:id', deleteAchievements)

