import { getUsers, login, logout, portfolio, signUp } from "../controllers/user.js";
import { Router } from "express";
import { checkUserSession } from "../middleware/auth.js";

// Create router
const userRouter = Router();

// Define routes
userRouter.get('/user', getUsers );

userRouter.post('/signup', signUp);

userRouter.post('/auth/login', login);

userRouter.post('/logout', checkUserSession, logout);

userRouter.get('/portfolio/auth/:userName', portfolio)

// export router
export default userRouter 