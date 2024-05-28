const categoryController=require('../controller/Category')
const route=require('express').Router()

route.post('/create',categoryController.create)
route.get('/findAll',categoryController.findAll)
route.delete('/delete/:id',categoryController.delete)




module.exports=route