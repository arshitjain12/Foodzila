import Review from "../models/reviewModel.js";
import Food from "../models/foodModel.js";
import Order from "../models/orderModel.js";

//add review
export const addReview = async (req, res) => {
  try {
    const { foodId, rating, comment } = req.body;
    const userId = req.body.userId;   // 🔥 middleware se

    if (!foodId || !rating) {
      return res.json({
        success: false,
        message: "foodId and rating required",
      });
    }

    const already = await Review.findOne({ user: userId, food: foodId });
    if (already) {
      return res.json({ success: false, message: "Already reviewed" });
    }

    await Review.create({
      user: userId,
      food: foodId,
      rating,
      comment,
    });

    const reviews = await Review.find({ food: foodId });
    const total = reviews.reduce((s, r) => s + r.rating, 0);

    await Food.findByIdAndUpdate(foodId, {
      avgRating: total / reviews.length,
      reviewCount: reviews.length,
    });

    res.json({ success: true, message: "Review added" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// pemding review
export const pendingReviews = async (req, res) => {
  try {
    const { orderId } = req.body;
    const userId = req.body.userId;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    const reviewed = await Review.find({ user: userId }).select("food");
    const reviewedIds = reviewed.map((r) => r.food.toString());

    const pending = order.items.filter(
      (item) => !reviewedIds.includes(item.food.toString())
    );

    res.json({ success: true, pending });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// get good review
export const getFoodReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ food: req.params.foodId }).populate(
      "user",
      "name"
    );
    res.json({ success: true, reviews });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
