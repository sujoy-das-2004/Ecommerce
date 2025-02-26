const OrderModel = require("../models/orderModel.js");
const CartModel = require("../models/cartModel.js");

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { user, items } = req.body;
      console.log(user, items);
      const newOrder = new OrderModel({
        user: user,
        items: items,
      });
      await newOrder.save();
      //update cart
      await CartModel.findOneAndUpdate(
        { user: user._id },
        { items: [] },
        { new: true }
      );
      return res.json({ success: true, data: newOrder, msg: "order created" });
    } catch (error) {
      return res.json({ success: false, msg: error });
    }
  },
  fetchOrderForUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const foundOrder = await OrderModel.find({
        "user._id": userId,
      }).sort({createdOn: -1});
      return res.json({ success: true, data: foundOrder });
    } catch (error) {
      return res.json({ success: false, msg: error });
    }
  },
  updateOrderStatus: async (req, res) => {
    try {
      const { orderId, status } = req.body;
      const updatedOrder = await OrderModel.findOneAndUpdate(
        { _id: orderId },
        { status: status },
        { new: true }
      );
      return res.json({ success: true, data: updatedOrder });
    } catch (error) {
      return res.json({ success: false, msg: error });
    }
  },
};

module.exports = orderController;
