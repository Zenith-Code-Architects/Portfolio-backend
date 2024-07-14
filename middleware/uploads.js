import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

export const remoteUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/portfolio-uploads/*' // If left blank, this defaults to root of drive '/',
    }),
    // preservePath: true
})