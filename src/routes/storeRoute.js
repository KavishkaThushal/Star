import express from "express";
import multer from "multer";
import {
    createStoreProduct,
    deleteItem,
    getAllItems,
    getAllStores,
    getStoreById, getStores,
    updateStoreProduct,
} from "../controllers/storeController.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.post("/", upload.single("image"),verifyToken, createStoreProduct);
router.put("/:id", upload.single("image"),verifyToken, updateStoreProduct);
router.get("/all-store",verifyToken, getAllStores);
router.get('/:id', getStoreById);
router.get("/", getAllItems);
router.delete("/:id",verifyToken, deleteItem);
router.get('/all/stores/products', getStores)

export { router as storeRouter };