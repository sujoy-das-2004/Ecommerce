const express = require("express");
const orderController = require("./../controller/orderController.js");

const orderRoute = express.Router();

orderRoute.post("/", orderController.createOrder);
orderRoute.get("/:userId", orderController.fetchOrderForUser);
orderRoute.put("/", orderController.updateOrderStatus);



module.exports = orderRoute;
