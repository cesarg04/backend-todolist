const { response } = require('express')

const usuariosGet = (req, res) => {
    const query = req.query
    res.json({
        msg: 'get API - controlador ',
        query
    })


}

const usuariosPost = (req, res) =>{

    const body = req.body;

    res.json({
        msg: 'post API - controlador',
        body
    })
}

const usuariosPut = (req, res) =>{
    const id = req.params.id
    res.json({
        msg: 'put API - controlador',
        id
    })
}

const usuariosDelete = (req, res) =>{
    res.json({
        msg: 'delete API - controlador'
    })
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}