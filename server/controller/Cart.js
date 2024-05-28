const Cart=require('../model/Cart')
const Product=require('../model/Product')


exports.create=async(req,res)=>{
    try {
        const isCart=await Cart.findOne({userId: req.user,productId:req.body.productId})
        if(isCart){
            isCart.quantity += req.body.quantity; 
            isCart.totalAmount += req.body.totalAmount; 
            await Cart.findByIdAndUpdate(isCart._id,{
                $set:{
                    quantity:isCart.quantity,
                    totalAmount:isCart.totalAmount
                }
            },{new:true})
            res.status(200).send(isCart)
        }else{
            const newCart=new Cart({
                userId:req.user,
                productId:req.body.productId,
                quantity:req.body.quantity,
                totalAmount:req.body.totalAmount
            })
            const cart=await newCart.save()
            res.status(200).send(cart)
        }
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.findByUser=async(req,res)=>{
    try {
        let data=[]
        const carts=await Cart.find({userId:req.user})
        for(cart of carts){
            const product=await Product.findOne({_id:cart.productId})
            data.push({cart,image:product.image,name:product.name})
        }
        res.status(200).send(data)
    } catch (err) {
        console.log(err)
    }
}
exports.delete=async(req,res)=>{
    try {
        const carts=await Cart.findByIdAndDelete(req.params.id)
        res.status(200).send('delete success')
    } catch (err) {
        console.log(err)
    }
}