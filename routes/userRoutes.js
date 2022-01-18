const express = require("express")
const { loginRequired } = require("../controllers/authController")
const userController = require("../controllers/userController")

const router = express.Router()

router.post("/login", userController.logIn)
.post("/signup", userController.signIn)
.post("/forgotpassword", userController.forgotPassword)
.post("/resetpassword", userController.resetPassword)
.patch("/changepassword", loginRequired, userController.changePassword)
.patch("/", loginRequired, userController.editUser)

module.exports = router