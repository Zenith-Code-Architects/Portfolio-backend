import { UserModel } from "../models/user.js";
import { user_schema } from "../schema/user_schema.js";
import bcrypt from 'bcrypt';

//create user with Validation & errror handling
export const signUp = async (req, res, next) => {
   try {
      const { error, value } = user_schema.validate(req.body)
      if (error) {
         return res.status(400).send(error.details[0].message)
      }
      const { email, userName } = value;
      //   const email = value.email
      //  check if email exist in the database
      const findExistingEmail = await UserModel.findOne({ email })
      if (findExistingEmail) {
         return res.status(401).send('Email already exist')
      }
      //  check if username exist in the database
      const findExistingUsername = await UserModel.findOne({ userName })
      if (findExistingUsername) {
         return res.status(401).send('Username already exist')
      }
      else {
         // Hash and assign hashed password as user password
         value.password = await bcrypt.hash(value.password, 12)
         // create user
         await UserModel.create(value)
         // return response
         return res.status(201).send('User registration successful')
      }
   } catch (error) {
      next(error)
   }
}

// Login user
export const login = async (req, res, next) => {
   try {
      const { userName, email, password } = req.body;
      //  Find a user using their email or username
      const user = await UserModel.findOne(
         { $or: [{ email: email }, { userName: userName }] }
      );
      if (!user) {
         return res.status(401).json('User does not exist')
      }
      // Verify user password
      const correctPass = bcrypt.compareSync(password, user.password)
      if (!correctPass) {
         return res.status(401).json('Invalid login details')
      }
      // Generate a session for the user
      req.session.user = { id: user.id }
      // Return response
      res.status(201).json('Login successful')
   } catch (error) {
      next(error)
   }
}

export const logout = async (req, res, next) => {
   try {
      // Destroy user session
      await req.session.destroy();
      // Return response
      res.status(200).json('User logged out')
   } catch (error) {
      next(error)
   }
}

export const portfolio = async (req, res, next) => {
   try {
      // Find a user by their id and display their portfolio
      const user = await UserModel
         .findById(req.session.user.id)
         .select({ password: false })
      // Return response
      res.status(200).json(user)
   } catch (error) {
      next(error)
   }
}