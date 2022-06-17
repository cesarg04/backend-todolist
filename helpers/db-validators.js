const usuarios = require("../models/usuarios")

const emailExiste = async(email = '') => {

    const existeEmail = await usuarios.findOne({ email })

    if (existeEmail) {
        throw new Error('El correo ya existe')
    }


}

const existeUsuarioporID = async(id = '') => {

    const idExiste = await usuarios.findById(id)

    if (!idExiste) {
        throw new Error('Usuario no encontrado')
    }

}

const validarPassword = async( password ) => {

    if (password) {
        
        if (password.lenth < 8) {
            throw new Error('El password debe tener almenos 8 caracteres')
        }

    }
}



module.exports = {
    emailExiste,
    existeUsuarioporID,
    validarPassword
}
