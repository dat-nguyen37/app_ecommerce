const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:Number
    },
    address:{
        type:String
    },
    image:{
        type:String
    },
    admin:{
        type:Boolean,
        default:false
    }
},
{timestamps:true}
)
module.exports=mongoose.model('user',userSchema)