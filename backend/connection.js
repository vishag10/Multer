const mongoose=require("mongoose")
async function connection(){
    const db=await mongoose.connect("mongodb://127.0.0.1:27017/MULTER")
    console.log("database connection established");
    return db
    
} 
module.exports=connection