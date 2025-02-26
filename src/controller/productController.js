const ProductModel = require("../models/productModel");

const categoryController = {
  createProduct: async (req, res) => {
    try {
      const productData = req.body;
      const newProduct= new ProductModel(productData);

      await newProduct.save();
      return res.json({
        success: true,
        data: newProduct,
        msg: "Product created",
      });
    } catch (error) {
      return res.json({ success: false, msg: error });
    }
  },

  fetchAllProduct: async (req, res) => {
    try {
      const product = await ProductModel.find();
      return res.json({
        success: true,
        data: product,
        msg: "Fetch The Details",
      });
    } catch (error) {
      return res.json({ success: false, msg: error });
    }
  },
  fetchProductViacategory: async (req, res) => {
    try {
      const categoryId=req.params.id;
      const product = await ProductModel.find({category:categoryId});
      if(!product){
        return res.json({
          success: false,
          data: category,
          msg: "Product not found",
        });
      }
      return res.json({
        success: true,
        data: product,
        msg: "Fetch The Details",
      });
    } catch (error) {
      return res.json({ success: false, msg: error });
    }
  },
};

module.exports = categoryController;
