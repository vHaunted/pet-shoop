import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/pet-shop`);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB connection error:", error.message);
  }
};

export default connectDB;
