import { LicenseModel } from "../models/license_certification.js";
import { UserModel } from "../models/user.js";
import { license_schema } from "../schema/license_schema.js";

// Validation & errror handling
export const addLicense = async (req, res) => {
    try {
        const { error, value } = license_schema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        //Create license with the value
        const license = await LicenseModel.create(value)
        //after, find the user with the id that you passed when creating the license 
        const user = await UserModel.findById(value.user);
        if (!user) {
            return res.status(404).send('User not found');
        }
        //if you find the user, push the license id you just created inside
        user.achievement.push(achievement._id);

        //and save the user now with the licenseId
        await user.save();
        res.status(201).json({ license })
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getLicense = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const idLicense = req.param.id
        if (idLicense) {
            //Get filtered  licenses from database
            const allLicense = await LicenseModel.findById(idLicense)
            //Return all filtered licenses
            return res.send(allLicense)
        } else {
            const allLicense = await LicenseModel.find({user: userId})
            if (allLicense.length == 0) {
                return res.status(400).send('No license provided')
            }
            res.status(200).json({ license:allLicense })
        }
    } catch (error) {
        next(error)
    }
}

export const updateLicense = async (req, res) => {

    try {
        const { error, value } = experience_schema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const experience = await ExperienceModel.findByIdAndUpdate(
            value,
            req.params.id,
            req.body,
            { new: true }
        )
        res.status(201).json({ experience })
    } catch (error) {
        res.status(500)
    }
}

export const deleteLicense = async (req, res) => {
    try {
        const { error, value } = experience_schema.validate(req.params.id)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const experience = await ExperienceModel.findByIdAndDelete(value)
        res.status(200).json({ experience })
    } catch (error) {
        res.status(500)
    }
}