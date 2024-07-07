import { Nitro } from "nitropack";
import mongoose from 'mongoose';

export async function connectDB(_nitroApp: Nitro){
    const config = useRuntimeConfig();
    console.log('runtime config:', config)

    console.log(config.mongodbUri)
  try {
    await mongoose.connect(config.mongodbUri);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;