const express = require("express");

const { addPost, deletePost, getAllPosts, getPostbyID, updatePost } =require('../controllers/post-controller');

const Router = express.Router()

const postRouter=express.Router();

postRouter.get("/",getAllPosts);
postRouter.get("/:id",getPostbyID);
postRouter.post("/",addPost);
postRouter.put("/:id",updatePost);
postRouter.delete("/:id",deletePost);



module.exports=postRouter;

