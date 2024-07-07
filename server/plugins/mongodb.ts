import { Nitro } from "nitropack";
import mongoose from 'mongoose';

export async function connectDB(_nitroApp: Nitro){
    const config = useRuntimeConfig();

  try {
    await mongoose.connect(config.mongodbUri);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;