import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  addReview,
  pendingReviews,
  getFoodReviews,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/add", authMiddleware, addReview);
router.post("/pending", authMiddleware, pendingReviews);

router.get("/food/:foodId", getFoodReviews);

export default router;
