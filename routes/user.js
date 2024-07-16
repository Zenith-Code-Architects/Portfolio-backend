import { getUsers, login, logout, portfolio, signUp, token } from "../controllers/user.js";
import { Router } from "express";
import { checkUserSession } from "../middleware/auth.js";

// Create router
const userRouter = Router();

// Define routes
userRouter.get('/user', getUsers );

userRouter.post('/auth/signup', signUp);

userRouter.post('/auth/login', login);

userRouter.post('/auth/token', token);

userRouter.post('/auth/logout', checkUserSession, logout);

userRouter.get('/portfolio/:userName', portfolio)

// export router
export default userRouter 