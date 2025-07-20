import express from "express";
import {
    deleteProduct,
    getProduct,
    getSingleProduct,
    postProduct,
    updateProduct
} from "../Controller/ProductController.js";

const router = express.Router();


router.post('/', postProduct);

router.get("/", getProduct)


router.get("/:id", getSingleProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;