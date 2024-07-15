import { addAchievements, deleteAchievements, getAchievements, updateAchievements } from "../controllers/achievements.js";
import { remoteUpload } from "../middleware/uploads.js";
import { Router } from "express";

export const achievementRouter = Router();

achievementRouter.post('/achievements',remoteUpload.single('image'), addAchievements)

achievementRouter.get('/achievements', getAchievements)

achievementRouter.get('/achievements/:id', getAchievements)

achievementRouter.patch('/achievements/:id',remoteUpload.single('image'), updateAchievements)

achievementRouter.delete('/achievements/:id', deleteAchievements)

