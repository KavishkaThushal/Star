import StoreModel from "../models/storeModel.js";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseUtil.js";

export const getAllStores = async (req, res) => {
  try {
    const filterOptions = {};
    if (req.query.name) filterOptions.name = { $regex: req.query.name, $options: "i" };
    if (req.query.category) filterOptions.category = req.query.category;
    if (req.query.brand) filterOptions.brand = { $regex: req.query.brand, $options: "i" };
    const stores = await StoreModel.find(filterOptions).lean();
    return sendSuccessResponse(res, 200, "Stores fetched successfully", stores);
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error", error);
  }
};

// Create new product
export const createStoreProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      brand,
      price,
      variants,
      stock,
      category,
      features,
      imageUrl
    } = req.body;

    const parsedFeatures = Array.isArray(features) ? features : JSON.parse(features);

    const newProduct = new StoreModel({
      name,
      description,
      brand,
      price,
      variants,
      stock,
      category,
      features: parsedFeatures,
      image: imageUrl, // <-- Use Cloudinary URL
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

// Update existing product
export const updateStoreProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      name,
      description,
      brand,
      price,
      variants,
      stock,
      category,
      features,
      imageUrl
    } = req.body;

    const parsedFeatures = Array.isArray(features) ? features : JSON.parse(features);

    const updatedFields = {
      name,
      description,
      brand,
      price,
      variants,
      stock,
      category,
      features: parsedFeatures,
    };

    if (imageUrl) {
      updatedFields.image = imageUrl;
    }

    const updatedProduct = await StoreModel.findByIdAndUpdate(productId, updatedFields, { new: true });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

export const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await StoreModel.findById(id);
    if (!store) return res.status(404).json({ message: 'Item not found' });
    res.json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const items = await StoreModel.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await StoreModel.findByIdAndDelete(id);
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};