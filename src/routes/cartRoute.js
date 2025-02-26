const express = require("express");
const cartControll = require("./../controller/cartController.js");

const cartRoute = express.Router();

cartRoute.post("/", cartControll.addToCart);
cartRoute.delete("/", cartControll.removeFromCart);
cartRoute.get("/:user", cartControll.getUsercart);


module.exports = cartRoute;
