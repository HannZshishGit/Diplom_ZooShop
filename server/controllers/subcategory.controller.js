import { subCategoryService } from "../services/subcategory.service.js";

export const getSubcategoriesByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    const data = await subCategoryService.getSubcategoriesByCategory(category);

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
