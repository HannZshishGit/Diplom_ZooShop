import { pool } from "../database/index.js";
import { subcategoryConfig } from "../config/subcategory.config.js";
import { CategoryEnum } from "../Enums/category.enum.js";
import { SubcategoryEnum } from "../Enums/subcategory.enum.js";

const getProductsBySubcategory = async (category, subcategory) => {
  const config = subcategoryConfig[subcategory.trim()];

  if (!config) {
    throw new Error("Invalid subcategory");
  }

  const dbCategory = CategoryEnum[category];
  const dbSubCategory = SubcategoryEnum[subcategory];

  if (!dbCategory) throw new Error(`Invalid category: ${category}`);
  if (!dbSubCategory) throw new Error(`Invalid subcategory: ${subcategory}`);

  const query = `
                select p.*, ${config.fields} 
                    from products p
                join ${config.table} ${config.alias} on p.product_id = ${config.alias}.product_id
                join subcategories s on p.subcategory_id = s.subcategory_id
                join categories c on s.category_id = c.category_id
                where c.category_name = ?
                and s.subcategory_name = ?;`;

  const [rows] = await pool.query(query, [dbCategory, dbSubCategory]);
  return rows;
};

const getProductByOwnArticle = async (category, subcategory, article) => {
  if (!article) {
    throw new Error("Article is required");
  }

  if (!category) {
    throw new Error(`Unknown article prefix: ${prefix}`);
  }

  const config = subcategoryConfig[subcategory.trim()];

  if (!config) {
    throw new Error("Invalid subcategory");
  }
  const query = `
                select p.*, ${config.fields}
                  from products p
                join ${config.table} ${config.alias} on p.product_id = ${config.alias}.product_id
                join subcategories s on p.subcategory_id = s.subcategory_id
                join categories c on s.category_id = c.category_id
                where p.article = ?`;

  try {
    const [rows] = await pool.query(query, [article]);

    const product = rows[0];

    console.log(product);

    return product;
  } catch (error) {
    console.log(error);
  }
};

export const productService = {
  getProductsBySubcategory,
  getProductByOwnArticle,
};
