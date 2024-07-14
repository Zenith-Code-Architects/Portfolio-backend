import { UserModel } from "../models/user.js";
import { user_schema } from "../schema/user_schema.js";
import bcrypt from 'bcrypt';

// Check if email exists
export const checkEmailExists = async (req, res, next) => {
   try {
      const { email } = req.params;
      const existingEmail = await UserModel.findOne({ email });
      if (existingEmail) {
         return res.status(200).json({ error: 'Email already exists' });
      }
      res.status(200).json({ message: 'Email available' });
   } catch (error) {
      next(error);
   }
};

// Check if username exists
export const checkUsernameExists = async (req, res, next) => {
   try {
      const { userName } = req.params;
      const existingUsername = await UserModel.findOne({ userName });
      if (existingUsername) {
         return res.status(200).json({ error: 'Username already exists' });
      }
      res.status(200).json({ message: 'Username available' });
   } catch (error) {
      next(error);
   }
};

// Sign up with validation & error handling
export const signUp = async (req, res, next) => {
   try {
      const { error, value } = user_schema.validate(req.body);
      if (error) {
         return res.status(400).send(error.details[0].message);
      }

      // Hash password before saving
      value.password = await bcrypt.hash(value.password, 12);

      // Create user
      await UserModel.create(value);

      // Return success response
      return res.status(201).json({ message: 'User registration successful' });
   } catch (error) {
      next(error);
   }
};


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

// get user portfolio
export const portfolio = async (req, res, next) => {
   try {
      const userId = req.session.user.id;

      const user = await UserModel
         .findById(userId)
         .select('-password') // Exclude password field from the user document

         // Populate user profile, projects, skills, and volunteering details
         .populate({
            path: 'userProfile',
            select: '-user -_id -__v -createdAt -updatedAt', // Exclude 'user' field from userProfile population
            options: { lean: true } // Return Mongoose documents as plain JavaScript objects
         })
         .populate({
            path: 'projects',
            select: '-user -_id -__v -createdAt -updatedAt', // Exclude 'user' field from projects population
            options: { lean: true }
         })
         .populate({
            path: 'skills',
            select: '-user -_id -__v -createdAt -updatedAt', // Exclude 'user' field from skills population
            options: { lean: true }
         })
         .populate({
            path: 'volunteering',
            select: '-user -_id -__v -createdAt -updatedAt', // Exclude 'user' field from volunteering population
            options: { lean: true }
         });

  // Ensure profile picture and resume URLs are populated correctly
  console.log('Profile Picture URL:', user.userProfile.profilePicture);
  console.log('Resume URL:', user.resume);

      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }

      // Return the complete user portfolio
      res.status(200).json(user);
   } catch (error) {
      next(error);
   }
};


// code below will fetch portfolio with or without login session
// export const portfolio = async (req, res, next) => {
//     try {
//         const userId = req.params.id; // Assuming userId is passed as a URL parameter

//         const user = await UserModel
//             .findById(userId)
//             .select('-password') // Exclude password field from the user document

//             // Populate user profile, projects, skills, and volunteering details
//             .populate({
//                 path: 'userProfile',
//                 select: '-user', // Exclude 'user' field from userProfile population
//                 options: { lean: true } // Return Mongoose documents as plain JavaScript objects
//             })
//             .populate({
//                 path: 'projects',
//                 select: '-user', // Exclude 'user' field from projects population
//                 options: { lean: true }
//             })
//             .populate({
//                 path: 'skills',
//                 select: '-user', // Exclude 'user' field from skills population
//                 options: { lean: true }
//             })
//             .populate({
//                 path: 'volunteering',
//                 select: '-user', // Exclude 'user' field from volunteering population
//                 options: { lean: true }
//             });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Return the complete user portfolio
//         res.status(200).json(user);
//     } catch (error) {
//         next(error);
//     }
// };
