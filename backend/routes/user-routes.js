const express=require('express');
const { getAllUsers,getUserById, signup, login } = require('../controllers/user-controller');
const User = require('../models/User');
// const router =express.Router();

const userRouter=express.Router();
userRouter.get("/:id", getUserById);
userRouter.get("/",getAllUsers);
userRouter.post("/signup",signup);
userRouter.post("/login",login);

// export default userRouter;
module.exports=userRouter