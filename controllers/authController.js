// ./controllers/authController.js

const User		= require("./../models/User")
const bcryptjs = require("bcryptjs")



exports.viewRegister = (req, res) => {

	res.render("auth/signup")

}

exports.register = async (req, res) => {

	// 1. OBTENCIÓN DE DATOS DEL FORMULARIO
	const username 	= req.body.username
	const email 	= req.body.email
	const password 	= req.body.password


	// 2. ENCRIPTACIÓN DE PASSWORD 🚩🚩🚩 Sha-256
	const salt = await bcryptjs.genSalt(10)
	const passwordEncriptado = await bcryptjs.hash(password, salt)
	
	const newUser = await User.create({
		username,
		email,
		passwordEncriptado
	}) 

	console.log(newUser)
	
	// 3. REDIRECCIÓN DE USUARIO
	res.redirect("/")

}