const express = require("express")
const pizzaController = require("../controllers/pizzaController")

const router = express.Router()

router.get("/", pizzaController.getPizzas)
.post("/", pizzaController.createPizza)

module.exports = router