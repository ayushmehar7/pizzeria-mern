const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")
const cors = require("cors")
const pizzaRouter = require("./routes/pizzaRoutes")
const userRouter = require("./routes/userRoutes")
const orderRouter = require("./routes/orderRoutes")
const reviewRouter = require("./routes/reviewRoutes")
const path = require("path")

dotenv.config({
    path: "./config.env"
})

const app = express()
app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())

app.use("/api/pizzas", pizzaRouter)
app.use("/api/users", userRouter)
app.use("/api/orders", orderRouter)
app.use("/api/reviews", reviewRouter)

if(process.env.NODE_ENV === 'production'){
    app.use("/", express.static("client/build"))
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "/client/build/index.html"))
    })
}


module.exports = app