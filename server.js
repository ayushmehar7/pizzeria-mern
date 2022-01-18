const app = require("./app")
const mongoose = require("mongoose")

mongoose.connect(process.env.DB_CONNECTION.replace("<PASSWORD>", process.env.DB_PASSWORD))
.then(()=> console.log("Database connected successfully!"))
.catch(err => console.error(err))

app.listen(process.env.PORT || 8000, (req,res)=> {
    console.log(`Server started in port ${process.env.PORT}`)
})