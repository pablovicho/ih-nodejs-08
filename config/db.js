const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true, //para trabajar con los nuevos métodos de mongoDB
        useUnifiedTopology: true // para utilizar vocabulario automático en mongoose
    })
    console.log("base de datos conectada")
    }
    
    module.exports = connectDB