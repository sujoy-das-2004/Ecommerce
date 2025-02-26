const mongoose = require("mongoose");

const orderItemsSchema=mongoose.Schema({
  product:{type:Map,required:true},
  quantity:{type:Number,default:1}
})

const orderSchema = mongoose.Schema({
  user:{
    type:Map,required:true
  },
  items:{
    type:[
        orderItemsSchema
    ],
    default:[],
  },
  status:{type:String,default:"order placed"},
  updatedOn: { type: Date },
  createdOn: { type: Date },
});

// Pre-save hook to hash password and set default fields
orderSchema.pre("save", function (next) {
  this.createdOn = new Date();
  this.updatedOn = new Date();

  next();
});

// Pre-update hook to set updatedOn field
orderSchema.pre(["findOneAndUpdate", "updateOne", "update"], function (next) {
  const update = this.getUpdate();
  if (update) {
    delete update._id;

    update.updatedOn = new Date();
  }
  next();
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
