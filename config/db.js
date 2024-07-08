import mongoose from "mongoose";
import 'dotenv/config';

// Created database connection
const dbConnect = await mongoose.connect(process.env.connectString);
console.log ('Connected to Portfolio Database')

export default dbConnect