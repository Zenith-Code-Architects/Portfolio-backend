import { addAchievements, deleteAchievements, getAchievements, getOneAchievements, updateAchievements } from "../controllers/achievements.js";
import { remoteUpload } from "../middleware/uploads.js";
import { Router } from "express";
import { checkUserSession } from "../middleware/auth.js";

export const achievementRouter = Router();

achievementRouter.post('/achievements',remoteUpload.single('image'),checkUserSession, addAchievements)

achievementRouter.get('/achievements',checkUserSession, getAchievements)

achievementRouter.get('/achievements/:id',checkUserSession, getOneAchievements)

achievementRouter.patch('/achievements/:id',remoteUpload.single('image'),checkUserSession, updateAchievements)

achievementRouter.delete('/achievements/:id',checkUserSession, deleteAchievements)

