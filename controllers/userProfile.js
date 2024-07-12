import { UserProfileModel } from "../models/userProfile.js";
import { UserModel } from "../models/user.js";
import { userProfile_schema } from "../schema/userProfile_schema.js";

// post user profile with validation & error handling
export const addUserProfile = async (req, res) => {
    try {
        const { error, value } = userProfile_schema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
          // Find the user with their user id
          const user = await UserModel.findById(value.user);
          if (!user) {
              return res.status(404).json('User not found')
          }
        // create user profile with the value
        const userProfile = await UserProfileModel.create(value)
        //push newly created user profile id inside
        user.userProfile = userProfile.id;
        // user.userProfile.assign(userProfile.id);
        // save user with the user profile id
        await user.save();
        // return response
        res.status(201).json({ userProfile })
    } catch (error) {
        res.status(500).send(error)
    }
}

// get user profile
export const getUserProfile = async (req, res, next) => {
    try {
        const userProfile = await UserProfileModel.findById(req.params.id);
        //    return response
        res.status(200).json(userProfile)
    } catch (error) {
        next(error)
    }
}

// update user profile
export const updateUserprofile = async (req, res, next) => {
    try {
        const { error, value } = userProfile_schema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        // do an update
        const updatedUserprofile = await UserProfileModel
            .findByIdAndUpdate(req.params.id, value, { new: true });
         // Find the user with their user id
         const user = await UserModel.findById(value.user);
         if (!user) {
             return res.status(404).json('User not found')
         }
         // If user is found, push newly updated value inside
         user.userProfile.push(updatedUserprofile);
         // save user with the user profile id
         await user.save();    
        //  return response
        res.status(200).json({updatedUserprofile});
    } catch (error) {
        next(error)
    }
}

// delete user profile
export const deleteUserprofile = async (req, res, next) => {
    try {
        await UserProfileModel.findByIdAndDelete(req.params.id);
        // return response
        res.status(200).json('User profile deleted')
    } catch (error) {
        next(error)
    }
}