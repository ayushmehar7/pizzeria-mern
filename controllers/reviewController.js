const Review = require("../models/reviewModel")
const Pizza = require("../models/pizzaModel")
const {errorHandling} = require("../utils/errorHandler")

exports.addReview = async (req, res)=>{
    const {text, pizza: pizzaName, rating} = req.body
    const user = req.user._id
    try{
        const pizza = await Pizza.findOne({name: pizzaName})
        const data = await Review.create({text, pizza: pizza._id, rating, user})
        res.status(201).json({
            review: data
        })
    }catch(err){
        errorHandling(res, err, "Review")
    }
}

exports.getUserReviews = (req, res)=>{
    Review.find({user: req.user._id}).then(data =>{
        res.status(200).json({
            reviews: data
        })
    }).catch(err =>{
        errorHandling(res, err, "Review")
    })
}

exports.deleteReview = async (req, res)=>{
    try{
        const review = await Review.findById(req.params.id)
        if(review.user._id.toString() !== req.user._id.toString()){
            return res.status(401).json({
                message: "Permission Denied"
            })
        }
        await Review.findByIdAndDelete(req.params.id)
        res.status(204).json({
            message: "Delete Success"
        })
    }catch(err){
        errorHandling(res, err, "Review")
    }
}

exports.editReview = (req, res)=>{
    const {id, text, rating} = req.body
    Review.findByIdAndUpdate(id, {text, rating}, {runValidators: true, new: true}).then((data)=>{
        res.status(200).json({
            review: data
        })
    }).catch(err =>{
        errorHandling(res, err, "Review")
    })
}