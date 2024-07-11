import { education } from "../controllers/education.js";
import { Router } from "express";

export const educationRouter = Router();

educationRouter.post('/user/educations', education)