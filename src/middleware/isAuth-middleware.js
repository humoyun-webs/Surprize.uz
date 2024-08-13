// const { verify } = require("../utils/jwt")
const jwt = require('jsonwebtoken')



const isAuth = async (req, res, next)=>{
    try{
    const token = await (req.headers["authorization"]).split(' ')[1];
     
    if(!token) return res.status(401).json({message: "Permission denied"});
    
    const JWT_SECRET_KEY = '5177f3a7-fc12-4d40-be35-171ee347a659';
    
    const user = await jwt.verify(token, JWT_SECRET_KEY);
    
    req.user = user;
    
    next()                                  
    
    }catch(error){
    return res.status(401).json({message: "Permission denied"});
    // console.log(error.message);
}
}

module.exports = {isAuth,}