const { request } = require('express')
const UserController=require('../controller/User')
const route=require('express').Router()

route.post('/auth/register',UserController.register)
route.post('/auth/signin',UserController.signin)
route.get('/getAll',UserController.getAll)
route.get('/getOne/:id',UserController.getOne)
route.put('/update/:id',UserController.update)
route.delete('/delete/:id',UserController.delete)






module.exports=route