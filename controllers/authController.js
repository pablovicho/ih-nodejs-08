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

    //  validación: checar que username, email y password tengan contenido
    if(!username || !email || !password) {
        res.render("auth/signup", {
         errorMessage: "Uno o más campos están vacíos"   
        })
        return
    }

    // validación 2 -- fortalecimiento de PW. Verificar que el pw tenga 6 caracteres, mínimo 1 número y al menos una mayúscula
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,} ///regex: expresiones regulares, auditar textos específicos
    if(!regex.test(password)){  //el método test viene en js
res.render("auth/signup", {
    errorMessage: "Tu password debe tener al menos un número y una mayúscula"
})
return
    }

	// 2. ENCRIPTACIÓN DE PASSWORD 🚩🚩🚩 Sha-256

    //si  llega a haber un problema en un ente externo, entonces el catch puede generar el error y avisarnos
    try{
        const salt = await bcryptjs.genSalt(10)
        const passwordEncriptado = await bcryptjs.hash(password, salt)
        
        const newUser = await User.create({
            username,
            email,
            passwordEncriptado
        }) 
        
        // 3. REDIRECCIÓN DE USUARIO
        res.redirect("/")

    } catch (error) { //sección de errores
        console.log(error)
res.status(500).render("auth/signup", {
    errorMessage: error.message //el error que viene del catch
}) //códigos de estado del servidor
    }

}

exports.viewLogin  = async(req,res) => {
res.render("auth/login")
}

exports.login = async(req,res) => {
    try {
        const email = req.body.email
        const  password = req.body.password
        console.log(password)

    
    // 1. obtención de datos del formulario
const foundUser = await  User.findOne({email})

    // 2. validación de usuario encontrado en BD
if(!foundUser){
    res.render("auth/login", {
        errorMessage: "Email o contraseña sin coincidencia."
    })
    return
}
    // 3. validación de contraseña
 const verifiedPass = await bcryptjs.compareSync(password, foundUser.passwordEncriptado) //compareSync  encripta el texto y lo compara con el passwordEncriptado. regresa un booleano
if(!verifiedPass){
    res.render("auth/login", {
        errorMessage: "Email o contraseña errónea. intenta nuevamente"
    })
}

 // 4. generar sesión: enviar cookie al usuario, generar persistencia de identidad
req.session.currentUser = {
    _id: foundUser._id,
    username:foundUser.username,
    email:foundUser.email,
    mensaje: "Lo logramos!!"
}


 // 5. redireccionar al home
    res.redirect("/users/profile")
} catch(error) {
    console.log(error)
}


}

exports.logout = async(req,res) => {
  res.clearCookie('session-token')
  req.session.destroy((error) => { //destroy borra la cookie
    if(error){
        console.log(error) 
        return//si hay un error al borrar la cookie
    }
    res.redirect("/")
  })
}