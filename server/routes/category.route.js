import express from "express";
import { getAllCategories } from "../controllers/category.controller.js";
const router = express.Router();

router.get("/get-all", getAllCategories);

export default router;
