import { ExperienceModel } from "../models/experience.js";
import { UserModel } from "../models/user.js";
import { experience_schema } from "../schema/experience_schema.js";

// Validation & errror handling
export const addExperience = async (req, res) => {
    try {
        const { error, value } = experience_schema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        console.log('userId', req.session.user.id)
        const userSessionId = req.session?.user?.id || req?.user?.id;
        //after, find the user with the id that you passed when creating the education 
        const user = await UserModel.findById(userSessionId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        //Create experience with the value
        const experience = await ExperienceModel.create({...value, user:userSessionId})
        //if you find the user, push the experience id you just created inside
        user.experiences.push(experience._id);

        //and save the user now with the experienceId
        await user.save();
        //Return the experience
        res.status(201).json({ experience })
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getExperience = async (req, res, next) => {
    try {
        const userSessionId = req.session?.user?.id || req?.user?.id;
        //Get filtered  experience from database

        const allExperience = await ExperienceModel.find({ user: userSessionId  })
        if (allExperience.length == 0) {
            return res.status(400).send('No experiences provided')
        }
        res.status(200).json({ experience: allExperience })

    } catch (error) {
        next(error)
    }
}

export const updateExperience = async (req, res) => {

    try {
        const { error, value } = experience_schema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const userSessionId = req.session?.user?.id || req?.user?.id;
        const user = await UserModel.findById(userSessionId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const experience = await ExperienceModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!experience) {
            return res.status(404).send('Education not found');
        }
        res.status(200).json({ experience })
    } catch (error) {
        res.status(500)
    }
}

export const deleteExperience = async (req, res) => {
    try {
        const userSessionId = req.session?.user?.id || req?.user?.id;
        const user = await UserModel.findById(idExperience);
        if (!user) {
            return res.status(404).send("User not found");
        }
        const experience = await ExperienceModel.findByIdAndDelete(req.params.id)
        if (!experience) {
            return res.status(404).send('Education not found');
        }
        user.experiences.pull(req.params.id);
        await user.save();
        res.status(200).json("Experience deleted");
    } catch (error) {
        res.status(500)
    }
}