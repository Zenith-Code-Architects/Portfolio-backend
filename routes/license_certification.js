import { license } from "../controllers/license_certification.js";
import { Router } from "express";

export const licenseRouter = Router();

licenseRouter.post('/user/licenses', license)