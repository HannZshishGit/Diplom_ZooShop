import { pool } from "../database/index.js";

const getAllCategories = async () => {
  const queryStr = "select * from categories";

  const [root] = await pool.query(queryStr);

  console.log(root);

  return root;
};

export const categoryService = {
  getAllCategories,
};
