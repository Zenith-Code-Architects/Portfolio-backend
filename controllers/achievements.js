import { AchievementModel } from "../models/achievements.js"
import { achievement_schema } from "../schema/achievement_schema.js"

// Validation & errror handling
export const achievements = (req, res) => {
    const { error, value } = achievement_schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
}