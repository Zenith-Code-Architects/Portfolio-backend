import { get } from "mongoose";
import { addLicense, deleteLicense, getLicense, updateLicense, } from "../controllers/license_certification.js";
import { Router } from "express";
import { remoteUpload } from "../middleware/uploads.js";

export const licenseRouter = Router();

licenseRouter.post('/licenses',remoteUpload.single('media'), addLicense)

licenseRouter.get('/licenses', getLicense)

licenseRouter.get('/licenses/:id', getLicense)

licenseRouter.patch('/licenses/:id',remoteUpload.single('media'), updateLicense)

licenseRouter.delete('/licenses/:id', deleteLicense)