const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  title: { type: String, required: [true, "Title is Required"] },
  description: { type: String, default: "" },
  updatedOn: { type: Date },
  createdOn: { type: Date },
});

// Pre-save hook to hash password and set default fields
categorySchema.pre("save", function (next) {
  this.createdOn = new Date();
  this.updatedOn = new Date();


  next();
});

// Pre-update hook to set updatedOn field
categorySchema.pre(["findOneAndUpdate", "updateOne", "update"], function (next) {
  const update = this.getUpdate();
  if (update) {
    delete update._id;

    update.updatedOn = new Date();
  }
  next();
});

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
