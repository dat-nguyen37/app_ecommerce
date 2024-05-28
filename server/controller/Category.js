const Category = require('../model/Category')

exports.create=async(req,res)=>{
    try {
        const newCategory= new Category(req.body)
        await newCategory.save()
        res.status(200).json('Create success')
    } catch (err) {
        res.status(500).json('Failure')
    }
}
exports.findAll=async(req,res)=>{
    try {
        const category= await Category.find()
        res.status(200).json(category)
    } catch (err) {
        res.status(500).json('Failure')
    }
}
exports.delete=async(req,res)=>{
    try {
        const category= await Category.findByIdAndDelete(req.params.id,{new:true})
        res.status(200).json("delete success")
    } catch (err) {
        res.status(500).json('Failure')
    }
}