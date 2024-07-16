import { addLicense, deleteLicense, getLicense, updateLicense, } from "../controllers/license_certification.js";
import { Router } from "express";
import { remoteUpload } from "../middleware/uploads.js";
import { checkUserSession } from "../middleware/auth.js";

export const licenseRouter = Router();

licenseRouter.post('/licenses',remoteUpload.single('media'),checkUserSession, addLicense)

licenseRouter.get('/licenses', getLicense)

licenseRouter.patch('/licenses/:id',remoteUpload.single('media'), updateLicense)

licenseRouter.delete('/licenses/:id',checkUserSession, deleteLicense)