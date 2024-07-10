import { UserModel } from "../models/user.js";
import { user_schema } from "../schema/user_schema.js";

// Validation & errror handling
export const signUp = (req, res) => {
    const { error, value } = user_schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
}