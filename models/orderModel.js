const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "An order must belong to a user"]
    },
    items: {
        type: [{
            name: {
                type: String,
                required: [true, "A pizza order item must have a name"]
            },
            quantity: {
                type: Number,
                required: [true, "A pizza order item must have a quantity"]
            },
            varient: {
                type: String,
                required: [true, "A pizza order item must have a varient"]
            },
            price: {
                type: Number,
                required: [true, "A pizza order item must have a price"]
            },
            image: {
                type:String,
                default: "https://img.freepik.com/free-vector/colorful-round-tasty-pizza_1284-10219.jpg?size=338&ext=jpg"
            },
        }],
        required: [true, "An order must have items"]
    },
    price: {
        type: Number,
        required: [true, "An order must have a price"]
    },
    transactionID: {
        type: String,
        required: [true, "An order must have a transcation ID"]
    },
    address: {
        type: {
            addressLine1 : {
                type: String,
                required: true
            },
            addressLine2: {
                type: String
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true
            },
            pincode: {
                type: String,
                required: true
            }
        },
        required: [true, "An order must have a address"],        
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order