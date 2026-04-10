import { categoryService } from "../services/category.service.js";

export const getAllCategories = async (req, res) => {
  try {
    const data = await categoryService.getAllCategories();

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
