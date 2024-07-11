import { project_schema } from "../schema/projects_schema.js";

// Validation & errror handling
export const projects = (req, res) => {
    const { error, value } = project_schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
}