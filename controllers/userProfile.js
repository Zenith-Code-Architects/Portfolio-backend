import { UserProfileModel } from "../models/userProfile.js";
import { userProfile_schema } from "../schema/userProfile_schema.js";

// Validation & errror handling
export const userProfile = (req, res) => {
    const { error, value } = userProfile_schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
}