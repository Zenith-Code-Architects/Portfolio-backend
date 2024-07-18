import { addLicense, deleteLicense, getLicense, getOneLicense, updateLicense, } from "../controllers/license_certification.js";
import { Router } from "express";
import { remoteUpload } from "../middleware/uploads.js";
import { checkUserSession } from "../middleware/auth.js";

export const licenseRouter = Router();

licenseRouter.post('/licenses',remoteUpload.single('media'),checkUserSession, addLicense)

licenseRouter.get('/licenses',checkUserSession, getLicense)

licenseRouter.get('/licenses/:id',checkUserSession, getOneLicense)

licenseRouter.patch('/licenses/:id',remoteUpload.single('media'),checkUserSession, updateLicense)

licenseRouter.delete('/licenses/:id',checkUserSession, deleteLicense)