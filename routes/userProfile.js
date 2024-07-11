import { addUserProfile } from "../controllers/userProfile.js";
import { Router } from "express";

export const userProfileRouter = Router();

userProfileRouter.post('/user/profile', addUserProfile)