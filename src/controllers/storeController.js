import StoreModel from "../models/storeModel.js";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseUtil.js";

export const getAllStores = async (req, res) => {
  try {
    const filterOptions = {};
    if (req.query.name) {
      filterOptions.name = { $regex: req.query.name, $options: "i" };
    }
    if (req.query.category) {
      filterOptions.category = req.query.category;
    }
    if (req.query.brand) {
      filterOptions.brand = { $regex: req.query.brand, $options: "i" };
    }
    const stores = await StoreModel.find(filterOptions).lean();

    return sendSuccessResponse(res, 200, "Stores fetched successfully", stores);
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error", error);
  }
};
