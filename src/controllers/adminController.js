import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseUtil.js";
import { productValidation } from "../validations/adminValidation.js";
import AppointmentModel from "../models/appointmentModel.js";
import StoreModel from "../models/storeModel.js";
import {comparePassword, hashPassword, hashRefreshToken} from "../utils/authUtils.js";
import { loginValidation } from "../validations/authValidation.js";
import UserModel from "../models/userModel.js";
import {generateAccessToken, generateRefreshToken} from "../utils/tokenUtils.js";

export const addProduct = async (req, res) => {
  const {
    name,
    description,
    brand,
    price,
    variants,
    image,
    stock,
    features,
    category,
  } = req.body;
  try {
    const validationErrors = productValidation(req.body);
    if (Object.keys(validationErrors).length > 0)
      return sendErrorResponse(res, 400, "validation error", validationErrors);

    await StoreModel.create({
      name,
      description,
      brand,
      price,
      variants,
      image,
      stock,
      features,
      category,
    });
    return sendSuccessResponse(res, 201, "Product added successfully");
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error", error);
  }
};

export const reviewJob = async (req, res) => {
  const { jobId } = req.params;
  const { status } = req.body;
  try {
    const job = await AppointmentModel.findById(jobId);
    if (!job) {
      return sendErrorResponse(res, 404, "Job not found");
    }
    job.progress = status;
    await job.save();
    return sendSuccessResponse(res, 200, "Job status updated successfully");
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error", error);
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await AppointmentModel.find().lean();
    return sendSuccessResponse(res, 200, "Jobs fetched successfully", jobs);
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error", error);
  }
};

export const editProduct = async (req, res) => {
  const { productId } = req.params;
  const {
    name,
    description,
    brand,
    price,
    variants,
    image,
    stock,
    features,
    category,
  } = req.body;
  try {
    const product = await StoreModel.findById(productId);
    if (!product) {
      return sendErrorResponse(res, 404, "Product not found");
    }
    product.name = name;
    product.description = description;
    product.brand = brand;
    product.price = price;
    product.variants = variants;
    product.image = image;
    product.stock = stock;
    product.features = features;
    product.category = category;

    await product.save();
    return sendSuccessResponse(res, 200, "Product updated successfully");
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error", error);
  }
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await StoreModel.findByIdAndDelete(productId);
    if (!product) {
      return sendErrorResponse(res, 404, "Product not found");
    }

    return sendSuccessResponse(res, 200, "Product deleted successfully");
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error", error);
  }
};

export const getProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await StoreModel.findById(productId).lean();
    if (!product) {
      return sendErrorResponse(res, 404, "Product not found");
    }

    return sendSuccessResponse(res, 200, "Product fetch successfully", product);
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error", error);
  }
};

export const adminLogin = async (req, res) => {
  try {
    console.log(process.env.ADMIN_SECRET);
    console.log(process.env.ADMIN_EMAIL);

    const validationErrors = loginValidation(req.body);
    if (Object.keys(validationErrors).length > 0)
      return sendErrorResponse(res, 400, validationErrors);

    const existAdmin = await UserModel.findOne({ role: "admin" });
    if (!existAdmin) {
      const hashedPassword = await hashPassword(process.env.ADMIN_SECRET);
      await UserModel.create({
        userName: "Star Admin",
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin",
      });
      return sendSuccessResponse(res, 201, "Admin created successfully");
    }

    const user = await UserModel.findOne({
      email: req.body.email,
      role: "admin", // Don't take this from req.body
    });
    if (!user) return sendErrorResponse(res, 404, "Admin not found");

    const isMatch = await comparePassword(req.body.password, user.password);
    if (!isMatch) return sendErrorResponse(res, 400, "Invalid credentials");

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    const hashedRefreshToken = await hashRefreshToken(refreshToken);

    user.refreshToken = hashedRefreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return sendSuccessResponse(res, 200, "Admin login successful", {
      accessToken,
    });
  } catch (err) {
    return sendErrorResponse(res, 500, "Internal server error", err);
  }
};

