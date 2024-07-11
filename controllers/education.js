import { EducationModel } from "../models/education.js";
import { UserModel } from "../models/user.js";
import {education_schema} from "../schema/education_schema.js";

// Validation & errror handling
export const addEducation = async (req, res) => {
    try {
        const { error, value } = education_schema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
         //create education with the value
        const education = await EducationModel.create(value)
        //after, find the user with the id that you passed when creating the education 
        const user = await UserModel.findById(value.user);
        if (!user) {
            return res.status(404).send('User not found');
        }
        //if you find the user, push the education id you just created inside
        user.education.push(education._id);
        //and save the user now with the educationId
        await user.save();
        //Return the education
        res.status(201).json({ education })
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getEducation = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const idEducation = req.param.id
        if (idEducation) {
          //Get filtered  education from database
          const allEducation = await EducationModel.findById(idEducation)
          //Return all filtered education
         return res.send(allEducation)
        } else {
        const allEducation = await EducationModel.find({user: userId})
        if (allEducation.length == 0) {
            return res.status(400).send('No education provided')
        }
        res.status(200).json({ education:allEducation })
        }
    } catch (error) {
        next(error)
    }
}

export const updateEducation = async (req, res) => {

    try {
        const { error, value } = education_schema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const education = await EducationModel.findByIdAndUpdate(
            value,
            req.params.id,
            req.body,
            { new: true }
        )
        res.status(201).json({ education })
    } catch (error) {
        res.status(500)
    }
}

export const deleteEducation = async (req, res) => {
    try {
        const { error, value } = education_schema.validate(req.params.id)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const education = await EducationModel.findByIdAndDelete(value)
        res.status(200).json({ education })
    } catch (error) {
        res.status(500)
    }
}