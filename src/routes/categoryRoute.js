const express = require("express");
const categoryRController=require('./../controller/categoryController.js')

const categoryRoute = express.Router();

categoryRoute.post('/',categoryRController.createCategory)
categoryRoute.get('/',categoryRController.fetchAllCategory)
categoryRoute.get('/:id',categoryRController.fetchCategoryById)

module.exports = categoryRoute;
