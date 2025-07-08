import express from "express";
import {
  cancelAppointment, getAllAppointments,
  getAppointments,
  makeAppointment, updateAppointmentProgress,
} from "../controllers/appointmentController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/create-appointment", verifyToken, makeAppointment);
router.get("/get-user-appointments", verifyToken, getAppointments);
router.get('/fetch/all', verifyToken, getAllAppointments);
router.delete("/cancel-appointment/:id", verifyToken, cancelAppointment);
router.put('/progress/:id',verifyToken, updateAppointmentProgress);
export { router as appointmentRouter };
