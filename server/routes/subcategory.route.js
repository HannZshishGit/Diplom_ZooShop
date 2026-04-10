import express from "express";
import { getSubcategoriesByCategory } from "../controllers/subcategory.controller.js";
const router = express.Router();

router.get("/get/:category", getSubcategoriesByCategory);

export default router;
