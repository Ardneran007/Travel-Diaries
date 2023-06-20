const express = require('express');
const postRouter =require("./routes/post-routes");
const userRouter =require("./routes/user-routes");
const cors = require('cors')


const connectToMongo=require('./db');

//connections to mongoDb
connectToMongo();

const app=express();

app.use(cors());
app.use(express.json());


//Middlewares
app.use("/user",userRouter);
app.use("/posts",postRouter);



app.listen(5000,()=>console.log("Listening on port 5000"));