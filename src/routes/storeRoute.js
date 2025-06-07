import express from "express";
import multer from "multer";
import {
    createStoreProduct,
    deleteItem,
    getAllItems,
    getAllStores,
    getStoreById,
    updateStoreProduct,
} from "../controllers/storeController.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.post("/", upload.single("image"), createStoreProduct);
router.put("/:id", upload.single("image"), updateStoreProduct);
router.get("/all-store", getAllStores);
router.get('/:id', getStoreById);
router.get("/", getAllItems);
router.delete("/:id", deleteItem);

export { router as storeRouter };