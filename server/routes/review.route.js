import express from "express";
import { createNewReview } from "../controllers/review.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/new", authMiddleware, createNewReview);

export default router;
