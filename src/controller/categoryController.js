const CategoryModel = require("../models/categoryModel.js");

const categoryController = {
  createCategory: async (req, res) => {
    try {
      const categoryData = req.body;
      const newCategory = new CategoryModel(categoryData);

      await newCategory.save();
      return res.json({
        success: true,
        data: newCategory,
        msg: "category created",
      });
    } catch (error) {
      return res.json({ success: false, msg: error });
    }
  },

  fetchAllCategory: async (req, res) => {
    try {
      const category = await CategoryModel.find();
      return res.json({
        success: true,
        data: category,
        msg: "Fetch The Details",
      });
    } catch (error) {
      return res.json({ success: false, msg: error });
    }
  },
  fetchCategoryById: async (req, res) => {
    try {
      const categoryId=req.params.id;
      const category = await CategoryModel.findById(categoryId);
      if(!category){
        return res.json({
          success: false,
          data: category,
          msg: "Category not found",
        });
      }
      return res.json({
        success: true,
        data: category,
        msg: "Fetch The Details",
      });
    } catch (error) {
      return res.json({ success: false, msg: error });
    }
  },
};

module.exports = categoryController;
