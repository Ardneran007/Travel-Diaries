const mongoose=require('mongoose');
const mongoURI="mongodb://localhost:27017/TravelDiaries"

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Database");
    })
}


module.exports=connectToMongo;