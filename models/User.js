//importaciones
const mongoose = require("mongoose")


//schema
const userSchema = mongoose.Schema({
    username: String,
    email: String,
    passwordEncriptado: String
})


//modelo
const User = mongoose.model("User", userSchema)

//exportación
module.exports = User