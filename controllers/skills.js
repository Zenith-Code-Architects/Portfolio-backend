import { SkillsModel } from "../models/skills.js"
import { UserModel } from "../models/user.js"
import { skills_schema } from "../schema/skills_schema.js"

// post skill with validation & error handling
export const addSkill = async (req, res) => {
    try {
        const { error, value } = skills_schema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        // create skill with its value
        const skill = await SkillsModel.create(value)
        // Find the user with their user id
        const user = await UserModel.findById(value.user);
        if (!user) {
            return res.status(404).json('User not found')
        }
        // If user is found, push newly created skill id inside
        user.skills.push(skill.id);
        // save user with the skill id
        await user.save();
        // return response
        res.status(201).json({ skill })
    } catch (error) {
        res.status(500).send(error)
    }
}

// get all user skills
export const getAllUserSkills = async (req, res, next) => {
    try {
        const allUserSkills = await SkillsModel.find({ user: req.params.id })
        if (allUserSkills == 0) {
            return res.status(404).json('No skill added')
        }
        //  return response
        res.status(200).json({ skills: allUserSkills })
    } catch (error) {
        next(error)
    }
}

// get skill by id 
export const getSkill = async (req, res, next) => {
    try {
        const skill = await SkillsModel.findById(req.params.id);
        //    return response
        res.status(200).json(volunteering)
    } catch (error) {
        next(error)
    }
}

// validate and update skills
export const updateSkills = async (req, res, next) => {
    try {
        const { error, value } = skills_schema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        // do an update
        const updatedSkills = await SkillsModel
            .findByIdAndUpdate(req.params.id, value, { new: true });
        //  return response
        res.status(200).json(updatedSkills);
    } catch (error) {
        next(error)
    }
}

// delete skill
export const deleteSkill = async (req, res, next) => {
    try {
        await SkillsModel.findByIdAndDelete(req.params.id);
        // return response
        res.status(200).json('Deleted')
    } catch (error) {
        next(error)
    }
}