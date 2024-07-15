import { addVolunteering, deleteVolunteering, getAllUserVolunteering, updateVolunteering } from "../controllers/volunteering.js";
import { Router } from "express";
import { checkUserSession } from "../middleware/auth.js";

// create router
const volunteeringRouter = Router();

// define routes
volunteeringRouter.post('/volunteering', checkUserSession, addVolunteering)

volunteeringRouter.get('/volunteering', checkUserSession, getAllUserVolunteering)

volunteeringRouter.patch('/volunteering/:id', checkUserSession, updateVolunteering)

volunteeringRouter.delete('/volunteering/:id', checkUserSession, deleteVolunteering)

// export router
export default volunteeringRouter