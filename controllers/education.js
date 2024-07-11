import { EducationModel } from "../models/education.js";
import {education_schema} from "../schema/education_schema.js";

// Validation & errror handling
export const education = (req, res) => {
    const { error, value } = education_schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
}