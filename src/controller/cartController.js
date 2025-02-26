const cartModel = require("../models/cartModel.js");


const categoryController = {
  addToCart: async (req, res) => {
    try {
      const { product, user, quantity } = req.body;
      const foundCart = await cartModel.findOne({ user: user });
      if (!foundCart) {
        const newCart = new cartModel({ user: user });
        newCart.items.push({
          product: product,
          quantity: quantity,
        });
        await newCart.save();
        return res.json({
          success: true,
          msg: "Product Added to Cart",
          data: newCart,
        });
      }
      //delete item if it already exsist
      const deletedItems=await cartModel.findOneAndUpdate(
        {user:user,"items.product":product},
        {$pull:{items:{product:product}}},
        {new:true}

      )
      //if cart exsist
      const updatedCart = await cartModel.findOneAndUpdate(
        { user: user },
        { $push: { items: { product: product, quantity: quantity } } },
        { new: true }
      ).populate("items.product");

      return res.json({
        success: true,
        updatedCart,
        msg: "Add to cart",
        data: updatedCart.items,
      });
    } catch (error) {
      return res.json({ success: false, msg: error });
    }
  },

  removeFromCart: async (req, res) => {
    try {
      const { user, product } = req.body;
      const updatedCart = await cartModel.findOneAndUpdate(
        { user: user },
        { $pull: { items: { product: product } } },
        { new: true }
      ).populate("items.product");
      return res.json({
        success: true,
        msg: "Remove from Cart",
        data: updatedCart.items,
      });
    } catch (error) {
      return res.json({ success: false, msg: error });
    }
  },
  getUsercart: async (req, res) => {
    try {
      const user = req.params.user;
      const foundCart = await cartModel.findOne({ user: user }).populate("items.product");
      if (!foundCart) {
        return res.json({ success: true, data: [] });
      }
      return res.json({ success: true, data: foundCart.items });
    } catch (error) {
      return res.json({ success: false, msg: error });
    }
  },
};

module.exports = categoryController;
