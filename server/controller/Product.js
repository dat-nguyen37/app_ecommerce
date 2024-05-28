const Product=require('../model/Product')


exports.create=async(req,res)=>{
    try {
        const newProduct=new Product(req.body)
        await newProduct.save()
        res.status(200).send('Product create success')
    } catch (err) {
        res.status(500).send('failue')
    }
}
exports.findAll=async(req,res)=>{
    try {
        let query = {};
        const {q,categoryId,sort,min,max}=req.query
        if(categoryId&&categoryId!=="" ){
            query.categoryId=categoryId
        }
        if(q&&q!=="" ){
            query.name={ $regex: q, $options: 'i' }
        }
        query.price = { $gt: min|1, $lt: max|100000000 };

        const product=await Product.find(query).sort({createdAt:sort==='new' ? -1 : 1})
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json('Failure')
    }
}
exports.findOne=async(req,res)=>{
    try {
        const product=await Product.findOne({_id:req.params.id})
        res.status(200).send(product)
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.update=async(req,res)=>{
    try {
        const result=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.delete=async(req,res)=>{
    try {
        const result=await Product.findByIdAndDelete(req.params.id,{new:true})
        res.status(200).send("delete successfull")
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.findByCategory=async(req,res)=>{
    try {
        const result=await Product.find({categoryId:req.params.id})
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err)
    }
}



