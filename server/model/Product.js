const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    name:{
        type:String
    },
    categoryId:{
        type:String
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    },
    image:{
        type:String
    },
    description:{
        type:String
    }
},
{timestamps:true}
)
module.exports=mongoose.model('product',productSchema)