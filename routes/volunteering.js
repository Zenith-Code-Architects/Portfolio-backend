import { volunteering } from "../controllers/volunteering.js";
import { Router } from "express";

export const volunteeringRouter = Router();

volunteeringRouter.post('/user/volunteering', volunteering)