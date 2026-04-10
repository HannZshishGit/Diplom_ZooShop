import express from "express";

import categoryRouter from "./category.route.js";
import subCategoryRoute from "./subcategory.route.js";
import productRoute from "./product.route.js";
import userRoute from "./user.route.js";
import orderRoute from "./order.route.js";
import reviewRoute from "./review.route.js";

const router = express.Router();

router.use("/category", categoryRouter);
router.use("/subcategory", subCategoryRoute);
router.use("/product", productRoute);
router.use("/user", userRoute);
router.use("/order", orderRoute);
router.use("/review", reviewRoute);

export default router;
