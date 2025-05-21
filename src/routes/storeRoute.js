import { getAllStores } from "../controllers/storeController.js";
import express from "express";

const router = express.Router();

router.get("/all-store", getAllStores);

export { router as storeRouter };
