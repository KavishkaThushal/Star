import express from "express";
import {
  getAppointments,
  makeAppointment,
} from "../controllers/appointmentController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/create-appointment", verifyToken, makeAppointment); //create appointment by user
router.get("/get-user-appointments", verifyToken, getAppointments); //get all appointments by userId

export { router as appointmentRouter };
