const mongoose = require("mongoose")

const pizzaSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "A pizza must have a name"],
        unique: true,
        upperCase: true
    },
    varients: {
        type: [String],
        default: ["small", "medium", "large"]
    },
    prices: {
        type: Object,
        required: [true, "A pizza must have it's prices"]
    },
    category: {
        type: String,
        required: [true, "A pizza must have a category"],
        enum: {
            values : ['veg', 'nonveg', 'special'],
            message: "Enter a valid pizza category"
        }
    },
    image: {
        type: String,
        default: "https://img.freepik.com/free-vector/colorful-round-tasty-pizza_1284-10219.jpg?size=338&ext=jpg"
    },
    description: {
        type: String,
        required: [true, "A pizza must have a description"]
    },
    rating: {
        type: Number,
        default: 4.5,
    }
}, {toJSON: {virtuals: true}, toObject: {virtuals: true}})

pizzaSchema.virtual("reviews", {
    ref: "Review",
    foreignField: "pizza",
    localField: "_id"
})

const Pizza = mongoose.model("Pizza", pizzaSchema)
module.exports = Pizza