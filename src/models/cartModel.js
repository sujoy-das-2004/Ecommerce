const mongoose = require("mongoose");

const cartItemsSchema=mongoose.Schema({
  product:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},
  quantity:{type:Number,default:1}
})

const cartSchema = mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  items:{
    type:[
        cartItemsSchema
    ],
    default:[],
  },
  updatedOn: { type: Date },
  createdOn: { type: Date },
});

// Pre-save hook to hash password and set default fields
cartSchema.pre("save", function (next) {
  this.createdOn = new Date();
  this.updatedOn = new Date();

  next();
});

// Pre-update hook to set updatedOn field
cartSchema.pre(["findOneAndUpdate", "updateOne", "update"], function (next) {
  const update = this.getUpdate();
  if (update) {
    delete update._id;

    update.updatedOn = new Date();
  }
  next();
});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
