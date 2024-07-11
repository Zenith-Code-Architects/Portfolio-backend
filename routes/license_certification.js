import { get } from "mongoose";
import { addLicense, deleteLicense, getLicense, updateLicense, } from "../controllers/license_certification.js";
import { Router } from "express";

export const licenseRouter = Router();

licenseRouter.post('/user/licenses', addLicense)

licenseRouter.get('/user/licenses', getLicense)

licenseRouter.get('/user/licenses/:id', getLicense)

licenseRouter.patch('/user/licenses/:id', updateLicense)

licenseRouter.delete('/user/licenses/:id', deleteLicense)