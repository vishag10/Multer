const mongoose= require('mongoose')
const userSchema=new mongoose.Schema({
    username:{type:String},
    email:{type:String},
    phone:{type:Number},
    file:{type:Object}
})

module.exports=mongoose.model.User||mongoose.model("User",userSchema)