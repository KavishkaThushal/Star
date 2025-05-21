import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URL);
    console.log(
      `MongoDB Connected: ${connect.connection.host}, ${connect.connection.name}`
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
