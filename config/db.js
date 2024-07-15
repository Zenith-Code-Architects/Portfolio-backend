import mongoose from "mongoose";
import 'dotenv/config';

// Created database connection
const dbConnect = await mongoose.connect(process.env.CONNECT_STRING);
console.log('Connected to Portfolio Database')

export default dbConnect