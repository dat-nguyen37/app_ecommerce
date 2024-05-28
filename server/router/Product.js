const productController=require('../controller/Product')
const route=require('express').Router()

route.post('/create',productController.create)
route.get('/findAll',productController.findAll)
route.get('/findOne/:id',productController.findOne)

route.put('/update/:id',productController.update)
route.delete('/delete/:id',productController.delete)
route.get('/category/:id',productController.findByCategory)





module.exports=route