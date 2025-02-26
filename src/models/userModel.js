const mongoose = require("mongoose");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  fullName: { type: String, default: "User Name" },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, default: "" },
  address: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  profileProgress: { type: Number, default: 0 },
  updatedOn: { type: Date },
  createdOn: { type: Date },
});

// Pre-save hook to hash password and set default fields
userSchema.pre("save", function (next) {
  if (!this.id) {
    this.id = uuid.v1();
  }
  this.updatedOn = new Date();
  if (!this.createdOn) {
    this.createdOn = new Date();
  }

  // Hash the password only if it's new or modified
  if (this.isModified("password")) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  next();
});

// Pre-update hook to set updatedOn field
userSchema.pre(["findOneAndUpdate", "updateOne", "update"], function (next) {
  const update = this.getUpdate();
  if (update) {
    delete update._id;
    delete update.id;
    update.updatedOn = new Date();
  }
  next();
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
