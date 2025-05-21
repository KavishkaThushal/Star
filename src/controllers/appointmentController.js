import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseUtil.js";
import {appointmentFormValidation} from "../validations/appointmentValidation.js";
import AppointmentModel from "../models/appointmentModel.js";
import UserModel from "../models/userModel.js";
//create appointment
export const makeAppointment = async (req, res) => {
  const { userId } = req.user;
  const { firstName, lastName, email, phoneNumber, issue } = req.body;

  try {
    const validationErrors = appointmentFormValidation(req.body);
    
    if (Object.keys(validationErrors).length > 0)
      return sendErrorResponse(res, 400, "validation error", validationErrors);

    if (!(await UserModel.exists({ _id: userId }))) {
      return sendErrorResponse(res, 404, "User does not exist");
    }

    await AppointmentModel.create({
      userId,
      firstName,
      lastName,
      email,
      phoneNumber,
      issue,
    });

    return sendSuccessResponse(res, 201, "Appointment created successfully");
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error", error);
  }
};

//get all appointments
export const getAppointments = async (req, res) => {
  const { userId } = req.user;
  try {
    const appointments = await AppointmentModel.find({ userId }).lean();

    return sendSuccessResponse(
      res,
      200,
      "Appointments fetched successfully",
      appointments
    );
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error", error);
  }
};
