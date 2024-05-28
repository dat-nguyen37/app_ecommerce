const cartController=require('../controller/Cart')
const route=require('express').Router()
const checkLogin=require('../verifyToken')

route.post('/create',checkLogin,cartController.create)
route.get('/findByUser',checkLogin,cartController.findByUser)
route.delete('/delete/:id',checkLogin,cartController.delete)





module.exports=route