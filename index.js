import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dbConnect from './config/db.js';
import userRouter from './routes/user.js';
import userProfileRouter from './routes/userProfile.js';
import skillRouter from './routes/skills.js';
import volunteeringRouter from './routes/volunteering.js';
import projectRouter from './routes/projects.js';

// Create express app
const portfolioapp = express();

//Apply midlleware
portfolioapp.use(express.json());
portfolioapp.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // Store session
    store: MongoStore.create({
        mongoUrl: process.env.CONNECT_STRING
    })
})); 

// Use routes
portfolioapp.use('/api/v1', userRouter)
portfolioapp.use('/api/v1', userProfileRouter)
portfolioapp.use('/api/v1', skillRouter)
portfolioapp.use('/api/v1', volunteeringRouter)
portfolioapp.use('/api/v1', projectRouter)

// Listen for incoming requests
const port = process.env.PORT || 8080;
portfolioapp.listen( port , () => {
    console.log(`Portfolio App listening on port ${port}`);
});
