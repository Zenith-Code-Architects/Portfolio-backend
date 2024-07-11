import { projects } from "../controllers/projects.js";
import { Router } from "express";

export const projectRouter = Router()

projectRouter.post('/user/projects', projects)