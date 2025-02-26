const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  title: { type: String, required: [true, "Title is Required"] },
  description: { type: String, default: "", required: true },
  price: { type: Number, required: true },
  images: { type: Array, default: [], required: true },
  updatedOn: { type: Date },
  createdOn: { type: Date },
});

// Pre-save hook to hash password and set default fields
productSchema.pre("save", function (next) {
  this.createdOn = new Date();
  this.updatedOn = new Date();

  next();
});

// Pre-update hook to set updatedOn field
productSchema.pre(["findOneAndUpdate", "updateOne", "update"], function (next) {
  const update = this.getUpdate();
  if (update) {
    delete update._id;

    update.updatedOn = new Date();
  }
  next();
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
