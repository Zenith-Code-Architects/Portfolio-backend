import { addUserProfile, deleteUserprofile, getUserProfile, updateUserprofile } from "../controllers/userProfile.js";
import { Router } from "express";

// create router
const userProfileRouter = Router();

// define routes
userProfileRouter.post('/profile', addUserProfile)

userProfileRouter.get('/profile/:id', getUserProfile)

userProfileRouter.patch('/profile/:id', updateUserprofile)

userProfileRouter.delete('/profile/:id', deleteUserprofile)

// export router
export default userProfileRouter