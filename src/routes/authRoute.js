import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { adminLogin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.post("/admin-login", adminLogin);

export { router as authRouter };
