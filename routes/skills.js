import { addSkill, deleteSkill, getAllUserSkills, getSkill, updateSkills } from "../controllers/skills.js";
import { Router } from "express";
import { checkUserSession } from "../middleware/auth.js";

const skillRouter = Router();

skillRouter.post('/skills', checkUserSession, addSkill)

skillRouter.get('/skills', getAllUserSkills)

skillRouter.get('/skills/:id', getSkill)

skillRouter.patch('/skills/:id', checkUserSession, updateSkills)

skillRouter.delete('/skills/:id', checkUserSession, deleteSkill)

// export router
export default skillRouter