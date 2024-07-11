import { ExperienceModel } from "../models/experience.js";
import { experience_schema } from "../schema/experience_schema.js";

// Validation & errror handling
export const experience = (req, res) => {
    const { error, value } = experience_schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
}