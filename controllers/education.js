import { EducationModel } from "../models/education.js";
import { UserModel } from "../models/user.js";
import { education_schema } from "../schema/education_schema.js";

// Validation & errror handling
export const addEducation = async (req, res) => {
    try {
        const { error, value } = education_schema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        console.log('userId', req.session.user.id)
        const userSessionId = req.session.user.id
       
        //after, find the user with the id that you passed when creating the education 
        const user = await UserModel.findById(userSessionId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        //if you find the user, push the education id you just created inside
         //create education with the value
        const education = await EducationModel.create({...value, user:userSessionId})
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
        //we are fetching education that belongs to a particular user
        const userSessionId = req.session.user.id;
        const allEducation = await EducationModel.find({ user: userSessionId })
        if (allEducation.length == 0) {
            return res.status(400).send('No education provided')
        }
        res.status(200).json({ education: allEducation })

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
        const userSessionId = req.session.user.id;
        const user = await UserModel.findById(userSessionId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const education = await EducationModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!education) {
            return res.status(404).send('Education not found');
        }
    } catch (error) {
        res.status(500)
    }
}

export const deleteEducation = async (req, res) => {
    try {
        const idEducation = req.session.user.id
        const user = await UserModel.findById(idEducation);
        if (!user) {
          return res.status(404).send("User not found");
        }
        const education = await EducationModel.findByIdAndDelete(req.params.id)
        if (!education) {
            return res.status(404).send('Education not found');
        }
        user.education.pull(req.params.id);
        await user.save();
      res.status(200).json("Education deleted");
    } catch (error) {
        res.status(500).json({error})
    }
};