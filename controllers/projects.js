import { ProjectModel } from "../models/projects.js";
import { UserModel } from "../models/user.js";
import { project_schema } from "../schema/projects_schema.js";

// post project with validation & error handling
export const addProject = async (req, res) => {
    try {
        const { error, value } = project_schema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        // create project with its value
        const project = await ProjectModel.create(value)
        // Find the user with their user id
        const user = await UserModel.findById(value.user);
        if (!user) {
            return res.status(404).json('User not found')
        }
        // If user is found, push newly created project id inside
        user.projects.push(project.id);
        // save user with the project id
        await user.save();
        // return response
        res.status(201).json({ project })
    } catch (error) {
        res.status(500).send(error)
    }
}

// get all user projects
export const getAllUserProjects = async (req, res, next) => {
    try {
        const allUserProjects = await ProjectModel.find({ user: req.params.id })
        if (allUserProjects == 0) {
            return res.status(404).json('No project added')
        }
        //  return response
        res.status(200).json({ projects: allUserProjects })
    } catch (error) {
        next(error)
    }
}

// get project by id 
export const getProject = async (req, res, next) => {
    try {
        const project = await ProjectModel.findById(req.params.id);
        //    return response
        res.status(200).json(project)
    } catch (error) {
        next(error)
    }
}

// validate and update projects
export const updateProjects = async (req, res, next) => {
    try {
        const { error, value } = projects_schema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        // do an update
        const updatedProjects = await ProjectModel
            .findByIdAndUpdate(req.params.id, value, { new: true });
        //  return response
        res.status(200).json(updatedProjects);
    } catch (error) {
        next(error)
    }
}

// delete project
export const deleteProject = async (req, res, next) => {
    try {
        await SkillsModel.findByIdAndDelete(req.params.id);
        // return response
        res.status(200).json('Deleted')
    } catch (error) {
        next(error)
    }
}