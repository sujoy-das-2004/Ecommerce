const express = require("express");
const bodyParser=require('body-parser')
const morgan=require('morgan')
const helmet=require('helmet')
const cors=require('cors')
const mongoose=require('mongoose');
const userRouter = require("./routes/userRoutes.js");
const categoryRoute = require("./routes/categoryRoute.js");
const productRoute = require("./routes/productRoute.js");
const cartRoute = require("./routes/cartRoute.js");
const orderRoute = require("./routes/orderRoute.js");

const PORT = 5000;
const app = express();



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(helmet())
app.use(morgan('dev'))
app.use(cors())

app.use("/api/user",userRouter)
app.use("/api/category",categoryRoute)
app.use("/api/product",productRoute)
app.use("/api/cart",cartRoute)
app.use("/api/order",orderRoute)




mongoose.connect("mongodb://localhost:27017/ecom_interview").then(()=>{
  console.log("DataBase connect")
})

app.listen(PORT, () => console.log(`server start at PORT in ${PORT}`));
