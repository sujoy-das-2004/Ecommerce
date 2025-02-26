const express = require("express");
const productController = require("./../controller/productController.js");

const productRoute = express.Router();

productRoute.post("/", productController.createProduct);
productRoute.get("/", productController.fetchAllProduct);
productRoute.get("/category/:id", productController.fetchProductViacategory);

module.exports = productRoute;
