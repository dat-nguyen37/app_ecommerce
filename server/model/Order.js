const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    userId:{
        type:String
    },
    product:[
        {productId:String,quantity:Number,total:Number}
    ],
    price:{
        type:Number
    },
    name:{
        type:String
    },
    phone:{
        type:Number
    },
    address:{
        type:String
    },

},
{timestamps:true})
module.exports=mongoose.model("order",orderSchema)