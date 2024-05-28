const User=require('../model/User')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

exports.register=async(req,res)=>{
    try {
        const hashPassword=await bcrypt.hash(req.body.password,10)
        const newUser= new User({name:req.body.name,email:req.body.email,password:hashPassword})
        const user=await newUser.save()
        res.status(200).json('Register successfull')
    } catch (err) {
        res.status(500).json("failure!")
    }
}
exports.signin=async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email})
        if(!user){
            return res.status(404).json('User not found')
        }
        const IsPassword=await bcrypt.compare(req.body.password,user.password)
        if(!IsPassword){
            return res.status(400).json('Wrong password')
        }
        const token=jwt.sign({id:user._id,email:user.email,admin:user.admin},process.env.SECRET)
        res.setHeader('Authorization', 'Bearer ' + token);
        res.status(200).json({user,token})
    } catch (err) {
        res.status(500).json("failure!")
    }
}

exports.getAll=async(req,res)=>{
    try {
        const users=await User.find()
        res.status(200).send(users)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getOne=async(req,res)=>{
    try {
        const user=await User.findOne({_id:req.params.id})
        res.status(200).send(user)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.update=async(req,res)=>{
    try {
        const result=await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.delete=async(req,res)=>{
    try {
        const result=await User.findByIdAndDelete(req.params.id,{new:true})
        res.status(200).send("delete successfull")
    } catch (err) {
        res.status(500).send(err)
    }
}
