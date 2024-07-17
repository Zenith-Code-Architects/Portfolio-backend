import { addProject, deleteProject, getAllUserProjects, getProjectById, updateProjects } from "../controllers/projects.js";
import { Router } from "express";
import { checkUserSession } from "../middleware/auth.js";

// Create router
const projectRouter = Router();

// Define routes
projectRouter.post('/projects', checkUserSession, addProject); // POST /projects

projectRouter.get('/projects', checkUserSession, getAllUserProjects); // GET /projects

projectRouter.get('/projects/:id', checkUserSession, getProjectById); // GET /project

projectRouter.patch('/projects/:id', checkUserSession, updateProjects); // PATCH /projects/:id

projectRouter.delete('/projects/:id', checkUserSession, deleteProject); // DELETE /projects/:id

// Export router
export default projectRouter;
