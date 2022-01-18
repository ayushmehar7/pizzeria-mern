exports.errorHandling = (res, err, model)=>{
    let message = ""
    let statusCode = ""
    if(err.name === "ValidationError"){
        statusCode = 400
        let m
        let r = err.message.replace(":", " --")
        r = r.replace(":", " --")
        m = r.split("--")[2]
        message = m.trim()
    }else if(err.code === 11000){
        statusCode = 400
        message = `A ${model} already exists`
    }else{
        statusCode = 500
        message = "Something went wrong"
    }
    res.status(statusCode).json({
        message,
        err
    })
}
