//importaciones
const mongoose = require("mongoose")


//schema
const userSchema = mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: [true, "Email es requerido"], //si está vacío
        match: [/^\S+@\S+\.\S+$/, "Por favor ingresa un email válido"], //regex
        unique: true, //email único
        lowercase: true, //minúsculas
        trim: true //sin espacios vacíos
    },
    passwordEncriptado: String
})


//modelo
const User = mongoose.model("User", userSchema)

//exportación
module.exports = User