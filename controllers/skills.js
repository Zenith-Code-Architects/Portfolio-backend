import { SkillsModel } from "../models/skills.js";
import { UserModel } from "../models/user.js";
import { skills_schema } from "../schema/skills_schema.js";

export const addSkill = async (req, res) => {
    try {
        // Validate skill data
        const { error, value } = skills_schema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        // Get user ID from session or request
        const userSessionId = req.session?.user?.id || req?.user?.id;

        // Check if the skill already exists for the user
        const existingSkill = await SkillsModel.findOne({ user: userSessionId, name: value.name });
        if (existingSkill) {
            return res.status(400).json('Skill already exists for this user');
        }

        // Find the user by userSessionId
        const user = await UserModel.findById(userSessionId);
        if (!user) {
            return res.status(404).json('User not found');
        }

        // Create new skill and associate it with the user
        const newSkill = await SkillsModel.create({ ...value, user: userSessionId });

        // Update user's skills array with new skill ID
        user.skills.push(newSkill._id);
        await user.save();

        // Return success response with created skill
        res.status(201).json({ skill: newSkill });
    } catch (error) {
        // Handle MongoDB duplicate key error (11000)
        if (error.code === 11000) {
            return res.status(400).json('Skill already exists for this user');
        }
        // Handle other errors
        console.error("Error adding skill:", error);
        res.status(500).send(error.message);
    }
};


export const getAllUserSkills = async (req, res, next) => {
    try {
        // Get user ID from session
        const userSessionId = req.session?.user?.id || req?.user?.id;

        // Find all skills belonging to the user
        const allUserSkills = await SkillsModel.find({ user: userSessionId });
        if (allUserSkills.length === 0) {
            return res.status(404).json('No skills found');
        }

        // Return skills in the response
        res.status(200).json({ skills: allUserSkills });
    } catch (error) {
        // Pass error to error handling middleware
        next(error);
    }
};

export const getSkillById = async (req, res, next) => {
    try {
        const userSessionId = req.session?.user?.id || req?.user?.id;

        // Find skill by ID and user
        const skill = await SkillsModel.findById(req.params.id);

        // Check if skill exists and belongs to the user
        if (!skill || skill.user.toString() !== userSessionId.toString()) {
            return res.status(404).json('Skill not found');
        }

        // Return the skill in the response
        res.status(200).json({ skill });
    } catch (error) {
        // Pass error to error handling middleware
        next(error);
    }
};


export const updateSkills = async (req, res, next) => {
    try {
        // Validate skill data
        const { error, value } = skills_schema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        // Get user ID from session
        const userSessionId = req.session?.user?.id || req?.user?.id;
        const user = await UserModel.findById(userSessionId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        // Find skill by ID and update it
        const updatedSkill = await SkillsModel
            .findByIdAndUpdate(req.params.id, value, { new: true });

        // Check if skill was found and updated
        if (!updatedSkill) {
            return res.status(404).json('Skill not found');
        }

        // Return updated skill in the response
        res.status(200).json({ updatedSkill });
    } catch (error) {
        // Pass error to error handling middleware
        next(error);
    }
};


export const deleteSkill = async (req, res, next) => {
    try {
        const userSessionId = req.session?.user?.id || req?.user?.id;
        const user = await UserModel.findById(userSessionId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        // Delete skill by ID
        const deletedSkill = await SkillsModel.findByIdAndDelete(req.params.id);

        // Check if skill was found and deleted
        if (!deletedSkill) {
            return res.status(404).json('Skill not found');
        }

        // Remove skill ID from user's skills array
        user.skills.pull(req.params.id);
        await user.save();
        // Return success message in the response
        res.status(200).json('Skill deleted');
    } catch (error) {
        // Pass error to error handling middleware
        next(error);
    }
};
