const UserModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs");

const userController = {
  createAccount: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if all required fields are provided
      if (!email || !password) {
        return res.json({ success: false, msg: "All fields are required." });
      }

      // Check if the user already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.json({
          success: false,
          msg: "User already exists. please Login",
        });
      }

      // Create a new user
      const newUser = new UserModel({ email, password });
      await newUser.save();

      return res.status(201).json({
        success: true,
        data: newUser,
        msg: "User created successfully.",
      });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error.message });
    }
  },
  loginAccount: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.json({ success: false, msg: "Fill The details" });
      }
      const foundUser = await UserModel.findOne({ email: email });
      if (!foundUser) {
        return res.json({ success: false, msg: "user not found" });
      }
      const ismatchPassword = bcrypt.compareSync(password, foundUser.password);
      if (!ismatchPassword) {
        return res.json({ success: false, msg: "password not match" });
      }
      console.log("user Login", foundUser);
      return res.json({ success: true, foundUser });
    } catch (error) {
      return res.json({ success: false, msg: error });
    }
  },
  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const updateData = req.body;

      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: userId },
        { updateData },
        { new: true }
      );

      if (!updatedUser) {
        throw "User NOt Found";
      }

      return res.json({
        success: true,
        updatedUser,
        msg: "updated user",
      });
    } catch (error) {
      return res.json({ success: false, msg: error });
    }
  },
};

module.exports = userController;
