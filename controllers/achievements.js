import { AchievementModel } from "../models/achievements.js";
import { UserModel } from "../models/user.js";
import { achievement_schema } from "../schema/achievement_schema.js"

// Validation & errror handling
export const addAchievements = async (req, res) => {

    try {
        const { error, value } = achievement_schema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        //Create achievement with the value
        const achievement = await AchievementModel.create(value)
        //after, find the user with the id that you passed when creating the achievement 
        const user = await UserModel.findById(value.user);
        if (!user) {
            return res.status(404).send('User not found');
        }

        //if you find the user, push the achievement id you just created inside
        user.achievement.push(achievement._id);

        //and save the user now with the achievementId
        await user.save();
        //Return the achievement
        res.status(201).json({ achievement })
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getAchievements = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const idAchievement = req.param.id;
        if (idAchievement) {
            //Get filtered  achievement from database
            const allAchievement = await AchievementModel.findById(idAchievement)
            //Return all filtered achievement
            return res.send(allAchievement)
        } else {
            const allAchievement = await AchievementModel.find({user: userId})
            if (allAchievement.length == 0) {
                return res.status(400).send('No achievement provided')
            }
            res.status(200).json({ achievement:allAchievement })
        }
    } catch (error) {
        next(error)
    }
}

export const updateAchievements = async (req, res) => {

    try {
        const { error, value } = achievement_schema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const achievement = await AchievementModel.findByIdAndUpdate(
            value,
            req.params.id,
            req.body,
            { new: true }
        )
        res.status(201).json({ achievement })
    } catch (error) {
        res.status(500)
    }
}

export const deleteAchievements = async (req, res) => {
    try {
        const { error, value } = achievement_schema.validate(req.params.id)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const achievement = await AchievementModel.findByIdAndDelete(value)
        res.status(200).json({ achievement })
    } catch (error) {
        res.status(500)
    }
}