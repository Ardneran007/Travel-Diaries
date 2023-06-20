const bcrypt=require('bcryptjs');
const User =require("../models/User");

//Find all records of the collection 
module.exports.getAllUsers=async(req,res)=>{
    let users;
    try {
        //fetch all records from db(no query provided)
        users=await User.find();
    } catch (e) {
        return console.log(e);
    }

    if(!users)
    {
        return res.status(500).json({message:"Unexpected error occured"});
    }
    return res.status(200).json({users}); 

};

module.exports.getUserById = async (req, res) => {
    const id = req.params.id;
  
    let user;
    try {
      user = await User.findById(id).populate("posts");
    } catch (err) {
      return console.log(err);
    }
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
  
    return res.status(200).json({ user });
  };
  
//Signup req
module.exports.signup=async(req,res,next)=>{
    //will get data from frontend
    const {name,email,password}= req.body;
    if(!name && name.trim()==="" && !email && email.trim()==="" && !password && password.length<6)
    {
        //unprocessable data
        return res.status(422).json({message:"Invalid Data"});
    }

    // const hashedpassword=hashSync(password)
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(password,salt);


    let user;
    try {
        user=await User.create({email,name,password:secPass});
        //dataase operation so await
        await user.save();
    } catch (e) {
        return console.log(e);
    }

    if(!user)
    {
        return res.status(500).json({message:"Unexpected error occured"});
    }
    return res.status(201).json({user}); 
};

//Login
module.exports.login=async(req,res,next)=>{
    const {email,password}= req.body;
    if(!email && email.trim()==="" && !password && password.length<6)
    {
        //unprocessable data
        return res.status(422).json({message:"Invalid Data"});
    }
    
    let existingUser;
    try {
        existingUser=await User.findOne({email});
    } catch (e) {
        return console.log(e);
    }
    
    if(!existingUser)
    {
        return res.status(404).json({message:"No user found"});
    }
    const passwordCompare=await bcrypt.compare(password,existingUser.password);

    if(!passwordCompare)
    {
        //unauthorised
        return res.status(400).json({message:"Incorrect Password"});
    }

    return res.status(200).json({id:existingUser._id,message:"Login Successfull"});
};