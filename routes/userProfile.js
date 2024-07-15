import { addUserProfile, deleteUserProfile, getUserProfile, updateUserProfile } from "../controllers/userProfile.js";
import { Router } from "express";
import { checkUserSession } from "../middleware/auth.js";
import { remoteUpload } from "../middleware/uploads.js";

// Create router
const userProfileRouter = Router();

// Define routes
userProfileRouter.post('/profile', remoteUpload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
]), addUserProfile);

userProfileRouter.get('/profile/:id', getUserProfile);

userProfileRouter.patch('/profile/:id', remoteUpload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
]), updateUserProfile);

userProfileRouter.delete('/profile/:id', deleteUserProfile);

// Export router
export default userProfileRouter;
