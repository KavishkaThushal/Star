import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    issue: {
      type: String,
      required: true,
    },
      appointDate: {
          type: Date,
          required: true,
      },
    progress: {
      type: String,
      enum: ["pending", "completed", "cancelled", "InCompleted"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const AppointmentModel = mongoose.model("Appointments", appointmentSchema);
export default AppointmentModel;
