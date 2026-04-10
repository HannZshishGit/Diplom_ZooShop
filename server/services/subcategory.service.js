import { pool } from "../database/index.js";

const getSubcategoriesByCategory = async (category) => {
  const queryStr = "select * from subcategories where category_id = ?";
  const categoryIdQuery =
    "select category_id from categories where category_name = ?";

  try {
    const [categoryRows] = await pool.query(categoryIdQuery, [category]);

    if (categoryRows.length === 0) {
      return [];
    }

    const categoryId = categoryRows[0].category_id;

    const [rows] = await pool.query(queryStr, [categoryId]);

    console.log(rows);

    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const subCategoryService = {
  getSubcategoriesByCategory,
};
