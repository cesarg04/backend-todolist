const { response } = require('express');
const Usuario = require('../models/usuarios')
const bcryptjs = require('bcryptjs')


const usuariosGet = (req, res) => {
    const query = req.query
    res.json({
        msg: 'get API - controlador ',
        query
    })


}

const usuariosPost = async(req, res) =>{

    const { password, nombre, email, rol } = req.body;

    const usuario = await new Usuario({ nombre, password, email, rol })

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync( password, salt );
    
    await usuario.save();

    res.status(200)

    res.json({
        msg: 'post API - controlador',
        usuario
    })
}

const usuariosPut = async(req, res) =>{
    const id = req.params.id

    const { _id, password, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const actualizarUsuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        msg: 'put API - controlador',
        actualizarUsuario
    })
}

const usuariosDelete = async(req, res) =>{

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })

    res.json({
        msg: 'Cuenta eliminada correctamente',
        usuario
    })
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}