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
        //Create experience with the value
        const experience = await ExperienceModel.create(value)
        //after, find the user with the id that you passed when creating the experience
        const user = await UserModel.findById(value.user);
        if (!user) {
            return res.status(404).send('User not found');
        }

        //if you find the user, push the experience id you just created inside
        user.experience.push(experience._id);

        //and save the user now with the experienceId
        await user.save();
        //Return the experience
        res.status(201).json({ experience })
    } catch (error) {
        res.status(500)
    }
}

export const getExperience = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const idExperience = req.param.id
        if (idExperience) {
          //Get filtered  experience from database
          const allExperience = await ExperienceModel.findById(idExperience)
          //Return all filtered experience
         return res.send(allExperience)
        } else {
        const allExperience = await ExperienceModel.find({user: userId})
        if (allExperience.length == 0) {
            return res.status(400).send('No experiences provided')
        }
        res.status(200).json({ experience:allExperience })
        }
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
        const experience = await ExperienceModel.findByIdAndUpdate(
            value,
            req.params.id,
            req.body,
            { new: true }
        )
        res.status(201).json({ experience })
    } catch (error) {
        res.status(500)
    }
}

export const deleteExperience = async (req, res) => {
    try {
        const { error, value } = experience_schema.validate(req.params.id)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const experience = await ExperienceModel.findByIdAndDelete(value)
        res.status(200).json({ experience })
    } catch (error) {
        res.status(500)
    }
}