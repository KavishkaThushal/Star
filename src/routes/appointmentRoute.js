import express from "express";
import {
  cancelAppointment, getAllAppointments,
  getAppointments,
  makeAppointment, updateAppointmentProgress,
} from "../controllers/appointmentController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/create-appointment", verifyToken, makeAppointment); //create appointment by user
router.get("/get-user-appointments", verifyToken, getAppointments); //get all appointments by userId
router.delete("/cancel-appointment/:id", verifyToken, cancelAppointment);
router.get('/fetch/all', getAllAppointments);
router.put('/progress/:id', updateAppointmentProgress);
export { router as appointmentRouter };
