import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  brand: {
    type: String,
  },
  price: {
    type: Number,
  },
  variants: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  features: {
    type: [],
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    enum: ["mobile", "earphones", "smartWatch"],
  },
});

const StoreModel = mongoose.model("Store", storeSchema);
export default StoreModel;
