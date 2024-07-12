import { VolunteeringModel } from "../models/volunteering.js";
import { UserModel } from "../models/user.js";
import { volunteering_schema } from "../schema/volunteering_schema.js";

// post volunteering with validation & error handling
export const addVolunteering = async (req, res) => {
    try {
        const { error, value } = volunteering_schema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        // Find the user with their user id
          const user = await UserModel.findById(value.user);
          if (!user) {
              return res.status(404).json('User not found')
          }
        // create volunteering with its value
        const volunteering = await VolunteeringModel.create(value)
        //push newly created volunteering id inside
        user.volunteering.push(volunteering.id);
        // save user with the volunteering id
        await user.save();
        // return response
        res.status(201).json({ volunteering })
    } catch (error) {
        res.status(500).send(error)
    }
}

// get all user volunteering
export const getAllUserVolunteering = async (req, res, next) => {
    try {
        const allUserVolunteering = await VolunteeringModel.find({ user: req.params.id })
        if (allUserVolunteering == 0) {
            return res.status(404).json('No volunteering added')
        }
        //  return response
        res.status(200).json({ volunteering: allUserVolunteering })
    } catch (error) {
        next(error)
    }
}

// get volunteering by id 
export const getVolunteering = async (req, res, next) => {
    try {
        const volunteering = await VolunteeringModel.findById(req.params.id);
        //    return response
        res.status(200).json(volunteering)
    } catch (error) {
        next(error)
    }
}

// validate and update volunteering
export const updateVolunteering = async (req, res, next) => {
    try {
        const { error, value } = volunteering_schema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        // do an update
        const updatedVolunteering = await VolunteeringModel
            .findByIdAndUpdate(req.params.id, value, { new: true });
        //  return response
        res.status(200).json(updatedVolunteering);
    } catch (error) {
        next(error)
    }
}

// delete volunteering
export const deleteVolunteering = async (req, res, next) => {
    try {
        await VolunteeringModel.findByIdAndDelete(req.params.id);
        // return response
        res.status(200).json('Deleted')
    } catch (error) {
        next(error)
    }
}