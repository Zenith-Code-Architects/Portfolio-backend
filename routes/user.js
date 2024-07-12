import { login, logout, portfolio, signUp } from "../controllers/user.js";
import { Router } from "express";
import { checkUserSession } from "../middleware/auth.js";

// Create router
const userRouter = Router();

// Define routes
userRouter.post('/signup', signUp);

userRouter.post('/login', login);

userRouter.post('/logout', checkUserSession, logout);

userRouter.get('/portfolio', checkUserSession, portfolio)

// export router
export default userRouter 