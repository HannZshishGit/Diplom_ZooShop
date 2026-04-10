import { reviewService } from "../services/review.service.js";

export const createNewReview = async (req, res) => {
  const user_id = req.user.user_id;
  const { content, product_id, review_data } = req.body;

  console.log(user_id, content, product_id, review_data);

  try {
    reviewService.createNewReview(user_id);
  } catch (error) {
    console.log(error);
  }
};
