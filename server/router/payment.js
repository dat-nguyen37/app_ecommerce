const paymentController=require('../controller/payment')
const checkLogin =require('../verifyToken')
const route=require('express').Router()

route.post('/create_payment_url',paymentController.create_payment_url)
route.get('/vnpay_return',paymentController.vnpay_return)
route.get('/vnpay_ipn',paymentController.vnpay_ipn)

module.exports=route