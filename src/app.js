
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnect } from "./config/db_connection.js";
import { authRouter } from "./routes/authRoute.js";
import { storeRouter } from "./routes/storeRoute.js";
import { appointmentRouter } from "./routes/appointmentRoute.js";
import { adminRouter } from "./routes/adminRoute.js";



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

dbConnect();

app.use("/api/auth", authRouter);
app.use("/api/store", storeRouter);
app.use("/api/appointment", appointmentRouter);
app.use("/api/admin", adminRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});