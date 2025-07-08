import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {addProduct, deleteProduct, editProduct, getAllJobs, getProduct, reviewJob} from "../controllers/adminController.js";

const router = express.Router();

router.post("/add-product", verifyToken, addProduct);
router.get("/get-jobs", verifyToken, getAllJobs);
router.post("/job-review/:jobId", verifyToken, reviewJob);
router.get("/get-product/:productId", verifyToken, getProduct);
router.delete("/delete-product/:productId", verifyToken, deleteProduct);
router.put("/update-product/:productId", verifyToken, editProduct);

export { router as adminRouter };
