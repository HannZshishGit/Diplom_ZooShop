import { pool } from "../database/index.js";

const createNewReview = async (user_id, content, product_id, review_date) => {
  const query = `insert into reviews (content, review_date, product_id, user_id) values (?, ?, ?, ?)`;

  try {
    await pool.query(query, [content, review_date, product_id, user_id]);
  } catch (error) {
    console.log(error);
  }
};

export const reviewService = {
  createNewReview,
};
