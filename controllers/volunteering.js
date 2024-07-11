import { VolunteeringModel } from "../models/volunteering.js";
import { volunteering_schema } from "../schema/volunteering_schema.js";

// Validation & errror handling
export const volunteering = (req, res) => {
    const { error, value } = volunteering_schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
}