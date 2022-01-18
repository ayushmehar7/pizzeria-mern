const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const validateEmail = (email)=>{
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "A user must have a name"]
    },
    email: {
        type: String,
        required: [true, "A user must have an email"],
        unique: true,
        validate: [validateEmail, "Enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "A user must have a password"],
        select: false,
        minlength: 8
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isadmin: {
        type: Boolean, 
        default: false
    },
    passwordResetOTP: String,
    passwordResetOTPExpire: Date
})

userSchema.pre("save", async function(next){
    if(!this.isModified('password')){
        return next()
    }

    this.password = await bcrypt.hash(this.password, 12)
    next()
})

userSchema.methods.validatePassword = async(input_password, user_password)=>{
    return await bcrypt.compare(input_password, user_password)
}

userSchema.methods.resetPassword = (inputPassword)=>{
    
}

const User = mongoose.model("User", userSchema)

module.exports = User