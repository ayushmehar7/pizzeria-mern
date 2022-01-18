const Pizza = require("../models/pizzaModel")

exports.getPizzas = async (req, res)=>{
    Pizza.find().populate('reviews', 'text rating user').exec(function(err, data){
        if(err){
            return res.status(500).json({
                status: "failed",
                message: err
            })
        }
        res.status(200).json({
            status: "success",
            pizzas: data
        })
    })
}

exports.createPizza = async (req, res)=>{
    req.body.name = req.body.name.toUpperCase()
    Pizza.create(req.body).then(data =>{
        res.status(201).json({
            status: "success",
            pizza: data
        })
    }).catch(err => {
        res.status(400).json({
            status: "failed",
            message: err
        })
    })
}