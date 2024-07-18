import { addSkill, deleteSkill, getAllUserSkills, getSkillById, updateSkills } from "../controllers/skills.js";
import { Router } from "express";
import { checkUserSession } from "../middleware/auth.js";

// create skill router
const skillRouter = Router();

skillRouter.post('/skills', checkUserSession, addSkill)

skillRouter.get('/skills', checkUserSession, getAllUserSkills)

skillRouter.get('/skills/:id', checkUserSession, getSkillById)

skillRouter.patch('/skills/:id', checkUserSession, updateSkills)

skillRouter.delete('/skills/:id', checkUserSession, deleteSkill)

// export router
export default skillRouter