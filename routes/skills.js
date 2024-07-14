import { addSkill, deleteSkill, getAllUserSkills, updateSkills } from "../controllers/skills.js";
import { Router } from "express";
import { checkUserSession } from "../middleware/auth.js";

// create skill router
const skillRouter = Router();

skillRouter.post('/skills', checkUserSession, addSkill)

skillRouter.get('/skills', getAllUserSkills)

skillRouter.patch('/skills/:id', updateSkills)

skillRouter.delete('/skills/:id', checkUserSession, deleteSkill)

// export router
export default skillRouter