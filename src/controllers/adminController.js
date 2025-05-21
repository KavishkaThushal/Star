import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseUtil.js";
import { productValidation } from "../validations/adminValidation.js";
import AppointmentModel from "../models/appointmentModel.js";
import StoreModel from "../models/storeModel.js";

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

export const getAllJobs = async (req,res) => {
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

    return sendSuccessResponse(res, 200, "Product fetch successfully",product);
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error", error);
  }
};
