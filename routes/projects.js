import { addProject, deleteProject, getAllUserProjects, getProject, updateProjects } from "../controllers/projects.js";
import { Router } from "express";

// create router
const projectRouter = Router()

// define routes
projectRouter.post('/projects', addProject)

projectRouter.get('/projects', getAllUserProjects)

projectRouter.get('/projects/:id', getProject)

projectRouter.patch('/projects/:id', updateProjects)

projectRouter.delete('/projects/:id', deleteProject)

// export router
export default projectRouter