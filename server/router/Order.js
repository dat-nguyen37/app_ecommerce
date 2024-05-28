const orderController=require('../controller/Order')
const route=require('express').Router()
const checkLogin=require('../verifyToken')

route.post('/create',checkLogin,orderController.creatOrder)
route.get('/orderByUser',checkLogin,orderController.orderByUser)
route.get('/orderAll',checkLogin,orderController.orderAll)
route.get('/orderView/:id',checkLogin,orderController.orderView)
route.delete('/delete/:id',checkLogin,orderController.delete)







module.exports=route