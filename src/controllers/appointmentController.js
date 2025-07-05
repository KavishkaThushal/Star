import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseUtil.js";
import {appointmentFormValidation} from "../validations/appointmentValidation.js";
import AppointmentModel from "../models/appointmentModel.js";
import UserModel from "../models/userModel.js";
//create appointment
export const makeAppointment = async (req, res) => {
  try {
    const { userId } = req.user; // from auth middleware
    const { firstName, lastName, email, phoneNumber, issue, appointDate } = req.body;

    const validationErrors = appointmentFormValidation(req.body) || {};
    const now = new Date();
    const appointmentDate = new Date(appointDate);

    if (appointmentDate <= now) {
      validationErrors.appointDate = "Appointment date must be in the future.";
    }

    if (Object.keys(validationErrors).length > 0) {
      return sendErrorResponse(res, 400, "Validation error", validationErrors);
    }

    const userExists = await UserModel.exists({ _id: userId });
    if (!userExists) {
      return sendErrorResponse(res, 404, "User does not exist");
    }

    const existingAppointment = await AppointmentModel.findOne({
      email,
      appointDate: appointmentDate,
      progress: { $ne: "cancelled" },
    });

    if (existingAppointment) {
      return sendErrorResponse(
          res,
          409,
          "You already have an appointment on this date with this email."
      );
    }

    await AppointmentModel.create({
      userId,
      firstName,
      lastName,
      email,
      phoneNumber,
      issue,
      appointDate: appointmentDate,
      progress: "pending",
    });

    return sendSuccessResponse(res, 201, "Appointment created successfully");
  } catch (error) {
    console.error("Error in makeAppointment:", error);
    return sendErrorResponse(res, 500, "Internal server error", error.message);
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

export const cancelAppointment = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  try {
    const appointment = await AppointmentModel.findOne({ _id: id, userId });
    if (!appointment) {
      return sendErrorResponse(res, 404, "Appointment not found");
    }

    const now = new Date();
    if (appointment.appointDate <= now) {
      return sendErrorResponse(res, 400, "Cannot cancel past appointments");
    }

    appointment.progress = "cancelled";
    await appointment.save();

    return sendSuccessResponse(res, 200, "Appointment cancelled successfully");
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error", error.message);
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await AppointmentModel.find()
        .populate('userId', 'userName') // this pulls only the userName from User model
        .exec();
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch appointments', error: err });
  }
};


export const updateAppointmentProgress = async (req, res) => {
  const { id } = req.params;
  const { progress } = req.body;

  try {
    const updated = await AppointmentModel.findByIdAndUpdate(
        id,
        { progress },
        { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update progress', details: err });
  }
};
