import express from "express";
import { getProductsByCategoryAndSubcategory } from "../controllers/product.controller.js";
import { getProductByOwnArticle } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/get/:category/:subcategory/:article", getProductByOwnArticle);
router.get("/get/:category/:subcategory", getProductsByCategoryAndSubcategory);

export default router;
