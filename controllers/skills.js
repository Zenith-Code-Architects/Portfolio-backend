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

        // Get user ID from session
        const userSessionId = req.session.user.id;

        // Find the user by userSessionId
        const user = await UserModel.findById(userSessionId);
        if (!user) {
            return res.status(404).json('User not found');
        }

        // Create new skill and associate it with the user
        const skill = await SkillsModel.create({ ...value, user: userSessionId });

        // Update user's skills array with new skill ID
        user.skills.push(skill._id);
        await user.save();

        // Return success response with created skill
        res.status(201).json({ skill });
    } catch (error) {
        // Handle errors
        console.error("Error adding skill:", error);
        res.status(500).send(error.message);
    }
};

export const getAllUserSkills = async (req, res, next) => {
    try {
        // Get user ID from session
        const userSessionId = req.session.user.id;

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

export const updateSkills = async (req, res, next) => {
    try {
        // Find skill by ID and update it
        const updatedSkill = await SkillsModel
            .findByIdAndUpdate(req.params.id, req.body, { new: true });

        // Check if skill was found and updated
        if (!updatedSkill) {
            return res.status(404).json('Skill not found');
        }

        // Return updated skill in the response
        res.status(200).json(updatedSkill);
    } catch (error) {
        // Pass error to error handling middleware
        next(error);
    }
};

// export const updateSkills = async (req, res, next) => {
//     try {
//         const updatedSkills = await SkillsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedSkills) {
//             return res.status(404).json({ error: 'Skills not found' });
//         }
//         res.status(200).json(updatedSkills);
//     } catch (error) {
//         console.error('Error updating skills:', error);
//         next(error);
//     }
// }


export const deleteSkill = async (req, res, next) => {
    try {
        // Delete skill by ID
        const deletedSkill = await SkillsModel.findByIdAndDelete(req.params.id);

        // Check if skill was found and deleted
        if (!deletedSkill) {
            return res.status(404).json('Skill not found');
        }

        // Remove skill ID from user's skills array
        const user = await UserModel.findById(req.session.user.id);
        if (user) {
            user.skills = user.skills.filter(skillId => skillId.toString() !== req.params.id);
            await user.save();
        }

        // Return success message in the response
        res.status(200).json('Deleted');
    } catch (error) {
        // Pass error to error handling middleware
        next(error);
    }
};
