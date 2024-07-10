import express from 'express';
import dbConnect from './config/db.js';
import { userRouter } from './routes/user.js';
import { userProfileRouter } from './routes/userProfile.js';

// Create express app
const portfolioapp = express();

//Apply midlleware
portfolioapp.use(express.json());

portfolioapp.use('/api/v1', userRouter)
portfolioapp.use('/api/v1', userProfileRouter)

// Listen for incoming requests
const port = process.env.PORT || 8080;
portfolioapp.listen( port , () => {
    console.log(`Portfolio App listening on port ${port}`);
});
