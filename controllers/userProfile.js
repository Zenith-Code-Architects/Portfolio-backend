import { UserProfileModel } from "../models/userProfile.js";
import { userProfile_schema } from "../schema/userProfile_schema.js";

// post user profile with validation & error handling
export const addUserProfile = async (req, res) => {
    try {
        const { error, value } = userProfile_schema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        console.log('value', value)
        // post user profile
        const userProfile = await UserProfileModel.create(value)
        // return response
        res.status(201).json(userProfile)
    } catch (error) {
        res.status(500)
    }
}

// get user profile
export const getUserProfile = async (req, res, next) => {

}