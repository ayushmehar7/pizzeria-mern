const User = require("../models/userModel")
const {generateToken} = require("./authController")
const {errorHandling} = require("../utils/errorHandler")
const {sendMail} = require("../utils/email")

exports.signIn = async (req,res)=>{
    const {name, email, password} = req.body
    let user
    User.create({name, email, password}).then(data =>{
        user = data
        res.status(201).json({
            status: "success",
        })
    }).catch(err => {
        errorHandling(res, err, "user")
    })
}

exports.logIn = async (req, res) =>{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({
            message: "Email and Password required!"
        })
    }
    let isCorrect = false
    User.findOne({email}).select("+password").then(async data =>{
        if(data){
            isCorrect = await data.validatePassword(password, data.password)
        }
        if(!data || !isCorrect){
            return res.status(401).json({
                message: "Incorrect email or password!"
            })
        }
        data.password = undefined
        
        const {token, cookieOptions} = generateToken(data)
        res.cookie("jwt", token, cookieOptions)
        res.status(200).json({
            status: "success",
            user: data,
            token
        })
    }).catch(err =>{
        errorHandling(res, err, "user")
    })
}

const generateOTP = ()=>{
    let digits = '0123456789'
    let OTP = ""
    for(let i=0;i<6;i++){
        OTP+= digits[Math.floor(Math.random() * 10)]
    }
    return OTP  
}

exports.forgotPassword = (req,res)=>{
    let user;
    User.findOne({email: req.body.email}).then(async data=>{
        if(!data){
            return res.status(404).json({
                message: "User does not exists"
            })
        }
        user = data
        const OTP = generateOTP()
        const options = {
            email: req.body.email,
            subject: "Password reset OTP for Pizzeria",
        }
        try{
            await sendMail(options, OTP)
            user.passwordResetOTP = `${OTP}`
            user.passwordResetOTPExpire = Date.now()+ 10*60*1000
            await user.save();
            res.status(200).json({
                message: "Check email for password reset OTP"
            })
        }catch(err){
            res.status(500).json({
                message: "Something went wrong!",
                err
            })
        }
    }).catch(err =>{
        res.status(400).json({
            message: "Enter a valid email address"
        })
    })
}

const dateDifferenceMin = (d1, d2)=>{
    const diff = d1-d2
    const diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);
    return diffMins
}

exports.resetPassword = async (req, res)=>{
    const {newPassword, OTP} = req.body
    const user = await User.findOne({passwordResetOTP: OTP, passwordResetOTPExpire:{$gt : Date.now()}})
    if(!user || OTP !== user.passwordResetOTP || dateDifferenceMin(Date.now(), user.passwordResetOTPExpire) > 10){
        return res.status(400).json({
            message: "OTP is invalid or expired"
        })
    }
    user.password = newPassword
    user.passwordResetOTP = undefined
    user.passwordResetOTPExpire = undefined
    await user.save()
    res.status(200).json({
        message: "Password reset success"
    })
}

exports.editUser = (req,res)=>{
    const {name, email} = req.body
    User.findByIdAndUpdate(req.user._id, {name, email}, {
        runValidators: true,
        new: true
    }).then(data =>{
        res.status(200).json({
            user: data
        })
    }).catch(err=>{
        errorHandling(res, err, 'order')
    })
}

exports.changePassword = (req, res)=>{
    const {oldPassword ,newPassword} = req.body
    User.findById(req.user._id).select("+password").then(async data=>{
        const isCorrect = await data.validatePassword(oldPassword, data.password)
        if(!data || !isCorrect){
            return res.status(400).json({
                message: "Incorrect Password"
            })
        }
        data.password = newPassword;
        await data.save()
        res.status(200).json({
            message: "Password change success"
        })
    }).catch(err =>{
        errorHandling(res, err, "User")
    })
}