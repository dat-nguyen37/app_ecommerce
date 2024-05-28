const mongoose=require('mongoose')

const cartSchema=mongoose.Schema({
    userId:{
        type:String
    },
    productId:{
        type:String
    },
    quantity:{
        type:Number,
    },
    totalAmount:{
        type:Number
    },
},
{timestamps:true}
)
module.exports=mongoose.model('cart',cartSchema)