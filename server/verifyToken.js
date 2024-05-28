const jwt=require('jsonwebtoken')

const checkLogin=async(req,res,next)=>{
    let token =  req.headers.authorization.split(" ")[1]
    if (!token) {
      return res.status(403).send({
        message: "A token is required for authentication!"
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded.id;
      req.admin = decoded.admin;
     
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
};
module.exports=checkLogin