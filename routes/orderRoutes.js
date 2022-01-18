const express = require("express")
const orderController = require("../controllers/orderController")
const authController = require("../controllers/authController")
const router = express.Router()

router.get("/", authController.loginRequired, orderController.getUserOrders)
router.post("/pay", authController.loginRequired, orderController.makePayment)
router.post("/verify", authController.loginRequired, orderController.verifyPayment)
module.exports = router