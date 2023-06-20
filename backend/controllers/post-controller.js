const {mongoose,  mongo, startSession }=require("mongoose");
const Post =require("../models/Post");
const User =require("../models/User");

module.exports.getAllPosts=async(req,res)=>{
    let posts;
    try {
        posts=await Post.find();
    } catch (e) {
        return console.log(e);
    }

    if(!posts){
        return res.status(500).json({message:"Unexpected error occured"});
        
    }
    return res.status(200).json({posts}); 

};


module.exports.addPost=async(req,res)=>{
    const {title,description,location,date,image,user}=req.body;

    if(!title && title.trim==="" && !description && description.trim==="" && !location && location.trim==="" && !date && !user && !image)
    {
        return res.status(422).json({message:"Invalid Data"});
    }

    let existingUser;
    try {
        // existingUser=await User.findById(user);
        existingUser=await User.findById(`${user}`);
    } catch (e) {
        console.log("1.");
        return console.log(e);
    }

    if(!existingUser)
    {
        return res.status(404).json({message:"User not found"});
    }

    let post;

    try {
        post=await Post.create({title,description,image,location,date:new Date(`${date}`),user});
        
        // const session = await mongoose.startSession();
        // session.startTransaction();
        // console.log(existingUser);
        await existingUser.posts.push(post);
        // console.log(existingUser);
        await existingUser.save();
        await post.save();
        // await existingUser.save({ session });
        // post = await post.save({ session });
        // session.commitTransaction();

    } catch (e) {
        return console.log(e);
    }

    if(!post)
    {
        return res.status(500).json({message:"Unexpected error occured"});
    }
    return res.status(201).json({post}); 
};

module.exports.getPostbyID=async(req,res)=>{
    const id=req.params.id;

    let post;

    try {
        post=await Post.findById(id);

    } catch (e) {
        return console.log(e);
    }

    if(!post)
    {
        return res.status(404).json({message:"No Post found"});
    }
    return res.status(200).json({post});

};

module.exports.updatePost=async(req,res)=>{
    const id=req.params.id;
    
    const {title,description,location,image}=req.body;

    if(!title && title.trim==="" && !description && description.trim==="" && !location && location.trim===""  && !image)
    {
        return res.status(422).json({message:"Invalid Data"});
    }

    let post;
    try {
        post=await Post.findByIdAndUpdate(id,{
            title,description,image,location
        })

    } catch (e) {
        return console.log(e);
    }

    if(!post)
    {
        return res.status(500).json({message:"Unable to update"});
    }
    return res.status(200).json({message:"Updated Successfully"});
}

module.exports.deletePost=async(req,res)=>{
    const id=req.params.id;

    let post;
    try {
        post=await Post.findById(id).populate("user");
        await post.user.posts.pull(post);
        await post.user.save();


        post=await Post.findByIdAndRemove(id);

    } catch (e) {
        return console.log(e);
    }

    if(!post)
    {
        return res.status(500).json({message:"Unable to Delete"});
    }
    return res.status(200).json({message:"Deleted Successfully"});
}