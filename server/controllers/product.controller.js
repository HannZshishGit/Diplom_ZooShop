import { productService } from "../services/product.service.js";

export const getProductsByCategoryAndSubcategory = async (req, res) => {
  const { category, subcategory } = req.params;
  try {
    const data = await productService.getProductsBySubcategory(
      category,
      subcategory,
    );

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const getProductByOwnArticle = async (req, res) => {
  const { category, subcategory, article } = req.params;

  console.log(category, subcategory, article);

  try {
    const data = await productService.getProductByOwnArticle(
      category,
      subcategory,
      article,
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};
