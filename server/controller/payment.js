const moment = require('moment');
const Order =require('../model/Order')


exports.create_payment_url=(req, res) =>{
    
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    
    let ipAddr = req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;


    let config = require('config');
    
    let tmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');
    let vnpUrl = config.get('vnp_Url');
    let returnUrl = config.get('vnp_ReturnUrl');
    let orderId = moment(date).format('DDHHmmss');
    let amount = req.body.amount;
    let bankCode = "NCB";
    
    let locale = "vn";
    if(locale === null || locale === ''){
        locale = 'vn';
    }

    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = "Thanh toan don hang"+orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if(bankCode !== null && bankCode !== ''){
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");     
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    res.send({ paymentUrl: vnpUrl });
};

exports.vnpay_return=(req, res)=> {
    let vnp_Params = req.query;

    let secureHash = vnp_Params['vnp_SecureHash'];
   
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    let config = require('config');
    let tmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");     
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     

    if(secureHash === signed){
        var rspCode = vnp_Params['vnp_ResponseCode'];
        if(rspCode==="00"){
            res.redirect("http://192.168.01.17:5000/paymentSuccess?status=Success")
        }else{
            res.redirect("http://192.168.01.17:5000/paymentFailure?status=Failure")
        }
    } else {
        res.redirect("http://192.168.01.17:5000/paymentFailure?status=Invalid")
    }
}
exports.vnpay_ipn=async(req, reply)=> {
    let vnp_Params = req.query;
    let secureHash = vnp_Params['vnp_SecureHash'];
    let orderInfo = vnp_Params['vnp_OrderInfo'];
    let orderId = vnp_Params['vnp_TxnRef'];

    let rspCode = vnp_Params['vnp_replyponseCode'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    let config = require('config');
    let secretKey = config.get('vnp_HashSecret');
    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");     
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     
    
    let paymentStatus = '0'; 
    
    let checkOrderId = true; 
    let checkAmount = true; 
    if(secureHash === signed){ 
        if(checkOrderId){
            if(checkAmount){
                if(paymentStatus=="0"){ 
                    if(rspCode=="00"){
                         
                        res.status(200).send({RspCode: '00', Message: 'Success'})
                    }
                    else {
                        res.status(200).send({RspCode: '00', Message: 'Success'})
                    }
                }
                else{
                    res.status(200).send({RspCode: '02', Message: 'This order has been updated to the payment status'})
                }
            }
            else{
                res.status(200).send({RspCode: '04', Message: 'Amount invalid'})
            }
        }       
        else {
            res.status(200).send({RspCode: '01', Message: 'Order not found'})
        }
    }
    else {
        res.status(200).send({RspCode: '97', Message: 'Checksum failed'})
    }
};




function sortObject(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    let sorted = {};
    let keys = Object.keys(obj).sort();

    for (let key of keys) {
        sorted[encodeURIComponent(key)] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
    }

    return sorted;
}