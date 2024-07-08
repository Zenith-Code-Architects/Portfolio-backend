import express from 'express';
import dbConnect from './config/db.js';

// Create express app
const portfolioapp = express();

// Listen for incoming requests
const port = process.env.PORT || 8080;
portfolioapp.listen( port , () => {
    console.log(`Portfolio App listening on port ${port}`);
});
