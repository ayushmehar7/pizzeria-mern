const jwt = require("jsonwebtoken")
const {promisify} = require("util")
const User = require("../models/userModel")

exports.generateToken = (user)=>{
    const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn: "30d"})
    const cookieOptions = {
        expires: new Date(Date.now() + 30*24*60*60*1000)
    }
    return {
        token,
        cookieOptions
    }
}

exports.loginRequired = async (req, res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }
    if(!token){
        return res.status(401).json({
            message: "Please login to continue!"
        })
    }
    let decoded_id;
    try{
        decoded_id = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message: "Token invalid, please login again"
        })
    }
    const user = await User.findById(decoded_id.id)
    if(!user){
        return res.status(401).json({
            message: "User does not exist, please login again"
        })
    }
    req.user = user
    next()
}

exports.onlyAdminAccess = (req, res, next)=>{
    if(!req.user.isadmin){
        return res.status(403).json({
            message: "Access Denied"
        })
    }
    next()
}