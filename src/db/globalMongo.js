import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB has connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB failed to connect", error);
  }); 