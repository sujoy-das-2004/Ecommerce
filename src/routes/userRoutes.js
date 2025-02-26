const express = require("express");
const userController=require('./../controller/userController.js')

const userRouter = express.Router();

userRouter.post('/createAccount',userController.createAccount)
userRouter.post('/login',userController.loginAccount)
userRouter.put('/:id',userController.updateUser)

module.exports = userRouter;
