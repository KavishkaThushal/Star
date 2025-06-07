import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
   role:{
       type: String,
       enum: ["admin", "user"],
   },
   appointments: [
          {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Appointment",
          },
      ],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
