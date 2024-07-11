import { addVolunteering, deleteVolunteering, getAllUserVolunteering, getVolunteering, updateVolunteering } from "../controllers/volunteering.js";
import { Router } from "express";

// create router
const volunteeringRouter = Router();

// define routes
volunteeringRouter.post('/volunteering', addVolunteering)

volunteeringRouter.get('/volunteering', getAllUserVolunteering)

volunteeringRouter.get('/volunteering/:id', getVolunteering)

volunteeringRouter.patch('/volunteering/:id', updateVolunteering)

volunteeringRouter.delete('/volunteering/:id', deleteVolunteering)

// export router
export default volunteeringRouter