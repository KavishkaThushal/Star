import jwt from "jsonwebtoken";
import { sendErrorResponse } from "../utils/responseUtil.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Format: "Bearer <token>"

  if (!token) {
    return sendErrorResponse(res, 401, "Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return sendErrorResponse(res, 401, "Access Token expired.", err);
    } else if (err instanceof jwt.JsonWebTokenError) {
      return sendErrorResponse(res, 401, "Invalid token.", err);
    }
    return sendErrorResponse(res, 500, "Internal Server Error", err);
  }
};




