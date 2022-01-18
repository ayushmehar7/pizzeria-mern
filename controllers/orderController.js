const crypto = require("crypto")
const rp = require("razorpay")
const Order = require("../models/orderModel")
const {errorHandling } = require("../utils/errorHandler")
const { uuid } = require('uuidv4')

exports.makePayment = async (req, res)=>{
    const pay = new rp({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET
    })
    const options = {
        amount: req.body.amount*100,
        currency: "INR",
        receipt: uuid(),
        payment_capture: 1
    }
    const order = await pay.orders.create(options)
    if(!order){
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
    res.status(200).json({
        status: "success",
        order
    })
}

exports.verifyPayment = async (req, res)=>{
    const {
        orderCreationId,
        razorpayPaymentId,
        razorpaySignature,
    } = req.body.rpData;
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest("hex");
    if (digest !== razorpaySignature){
        return res.status(400).json({
            message: "Payment verification failed, please try again"
        })
    }
    const {items, price, address} = req.body.order
    const user = req.user._id
    Order.create({
        items,
        price,
        user,
        address,
        transactionID: razorpayPaymentId
    }).then(data =>{
        res.status(201).json({
            order: data
        })
    }).catch(err => {
        errorHandling(res, err, 'order')
    })
}

exports.getUserOrders = (req, res)=>{
    Order.find({user: req.user._id}).then(data =>{
        res.status(200).json({
            orders: data
        })
    }).catch(err =>{
        errorHandling(res, err, 'order')
    })
}