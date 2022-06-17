const { request, response } = require('express');
const Usuario = require('../models/usuarios')
const bcryptjs = require('bcryptjs')
const { generarJWT } = require('../helpers/generar-jwt')


const login = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {
        
        // Verificar si el usuario existe

        const usuario = await Usuario.findOne({ email })

        if (!usuario) {
            return res.status(400).json({
                msg: 'El correo no existe'
            })
        }

        // Verificar si el usuario esta activo

        if (!usuario.estado) {
            
            return res.status(401).json({
                msg: 'Usuario eliminado o bloqueado'
            })

        }

        // Verificar password

        const verificarPass = bcryptjs.compareSync(password, usuario.password);

        if (!verificarPass) {
            return res.status(401).json({
                msg: 'Password incorrecto'
            })
        }

        // Generar JWT

        const token = await generarJWT(usuario._id);

        req.usuario = usuario;

        console.log(req.usuario);

        res.json({
            msg: 'Done',
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}


module.exports = {
    login


}

