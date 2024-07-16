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
        console.log('userId', req.session.user.id)
        const userSessionId = req.session?.user?.id || req?.user?.id;

        //after, find the user with the id that you passed when creating the achievement 
        const user = await UserModel.findById(userSessionId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        //if you find the user, push the achievement id you just created inside
        //Create achievement with the value
        const achievement = await AchievementModel.create({
            ...value,
            user: userSessionId,
            image: req.file.filename
        })
        user.achievements.push(achievement._id);

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
        const userSessionId = req.session?.user?.id || req?.user?.id;
        const allAchievement = await AchievementModel.find({ user: userSessionId })
        if (allAchievement.length == 0) {
            return res.status(400).send('No achievement provided')
        }
        res.status(200).json({ achievement: allAchievement })
    } catch (error) {
        next(error)
    }
}

export const updateAchievements = async (req, res, next) => {
    try {
        const { error, value } = achievement_schema.validate({
            ...req.body,
            image: req.file.filename
        }
        )
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const userSessionId = req.session?.user?.id || req?.user?.id;
        const user = await UserModel.findById(userSessionId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const achievement = await AchievementModel.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                image: req.file.filename
            },
            { new: true }
        )
        if (!achievement) {
            return res.status(404).send('Achievement not found');
        }
        // return response
        res.status(200).json({ achievement })
    } catch (error) {
        next(error)
    }

}


export const deleteAchievements = async (req, res) => {
    try {
        const userSessionId = req.session?.user?.id || req?.user?.id;
        const user = await UserModel.findById(idAchievement);
        if (!user) {
            return res.status(404).send("User not found");
        }
        const achievement = await AchievementModel.findByIdAndDelete(req.params.id)
        if (!achievement) {
            return res.status(404).send('Achievement not found');
        }
        user.achievements.pull(req.params.id);
        await user.save();
        res.status(200).json('Achievement Deleted')
    } catch (error) {
        res.status(500)
    }
}