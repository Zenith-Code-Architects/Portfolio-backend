import express from 'express';
import dbConnect from './config/db.js';
import { licenseRouter } from './routes/license_certification.js';
import { achievementRouter } from './routes/achievement.js';
import { educationRouter } from './routes/education.js';
import { experienceRouter } from './routes/experience.js';


// Create express app
const portfolioapp = express();

portfolioapp.use('/api/v1', licenseRouter)
portfolioapp.use('/api/v1', achievementRouter)
portfolioapp.use('/api/v1', educationRouter)
portfolioapp.use('/api/v1', experienceRouter)

// Listen for incoming requests
const port = process.env.PORT || 8080;
portfolioapp.listen( port , () => {
    console.log(`Portfolio App listening on port ${port}`);
});
