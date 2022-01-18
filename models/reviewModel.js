const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "A review must be given by a user"]
    },
    pizza: {
        type: mongoose.Types.ObjectId,
        ref: "Pizza",
        required: [true, "A review must belong to a pizza"]
    },
    text: {
        type: String,
        required: [true, "A review must have text"]
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: [true, "A review must have rating"]
    }
})

reviewSchema.pre(/^find/, function(next){
    this.populate({
            path: 'user',
            select: 'name'
        }
    )
    this.populate({
        path: "pizza",
        select: "name image"
    })
    next()
})

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review
