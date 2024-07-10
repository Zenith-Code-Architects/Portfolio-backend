import { SkillsModel } from "../models/skills.js"
import { skills_schema } from "../schema/skills_schema.js"

// Validation & errror handling
export const skills = (req, res) => {
    const { error, value } = skills_schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
}