const Order =require('../model/Order')
const Cart=require('../model/Cart')
const Product=require('../model/Product')

exports.creatOrder=async(req,res)=>{
    try {
        if(req.user){
            const newOrder=new Order({
                userId:req.user,
                product:req.body.product,
                price:req.body.price,
                name:req.body.name,
                phone:req.body.phone,
                address:req.body.address,
            })
            const order=await newOrder.save()
            const cartItems=req.body.product.map(item=>item.productId)
            await Cart.deleteMany({userId:req.user,productId:{$in:cartItems}})
            res.status(200).send(order)
        }else{
            res.status(401).send("Authentication")    
        }
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.orderByUser=async(req,res)=>{
    try {
        let data=[]
        const orders=await Order.find({userId:req.user}).sort({createdAt: -1})
        for(order of orders){
            const products=await Promise.all(order.product.map(async(item)=>{
                const product= await Product.findOne({_id:item.productId})
                return { ...product._doc, quantity: item.quantity,total: item.total };
            }))
            data.push({ ...order._doc, product: products })
        }
        res.status(200).send(data)

    } catch (err) {
        res.status(500).send(err)
    }
}

exports.orderAll=async(req,res)=>{
    try {
        let data=[]
        const orders=await Order.find().sort({createdAt: -1})
        for(order of orders){
            const products=await Promise.all(order.product.map(async(item)=>{
                const product= await Product.findOne({_id:item.productId})
                return { ...product._doc, quantity: item.quantity,total: item.total };
            }))
            data.push({ ...order._doc, product: products })
        }
        res.status(200).send(data)

    } catch (err) {
        res.status(500).send(err)
    }
}
exports.orderView=async(req,res)=>{
    try {
        const order=await Order.findOne({_id:req.params.id})
        const products=await Promise.all(order.product.map(async(item)=>{
            const product= await Product.findOne({_id:item.productId})
            return { ...product._doc, quantity: item.quantity,total: item.total };
        }))
        res.status(200).send({ ...order._doc, product: products })
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.delete=async(req,res)=>{
    try {

        const orders=await Order.findByIdAndDelete({_id:req.params.id})
        
        res.status(200).send('Delete success')

    } catch (err) {
        res.status(500).send(err)
    }
}