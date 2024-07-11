import { UserModel } from "../models/user.js";
import { user_schema } from "../schema/user_schema.js";
import * as bcrypt from 'bcrypt';

// Validation & errror handling
export const signUp = async (req, res, next) => {
   try {
     const { error, value } = user_schema.validate(req.body)
     if (error) {
         return res.status(400).send(error.details[0].message)
     }
     const email = value.email
    //  console.log('email', email)
    //  check if user exist in the database
     const findExistingUser = await UserModel.findOne({email})
     if(findExistingUser){
        return res.status(401).send('Email already exist')
     } else {
        // Hash and re-assign user password
        value.password = await bcrypt.hash(value.password, 12)
        // create user
       const addUser = await UserModel.create(value)
        // return response
        return res.status(201).send(addUser)
     }
   } catch (error) {
    
   }
}