const { request, response } = require("express");
const tareas = require("../models/tareas");
const Tareas = require("../models/tareas");


const getTareas = async(req = request, res = response) => {

    const { _id } = req.usuario;
    const a = _id.toString()

    const { limite, desde = 0 } = req.query;
    const query = { usuario: a };

    const [total, tasks] = await Promise.all([
        tareas.countDocuments( true ),
        tareas.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        tasks
    })

}

const getTareasId = async(req = request, res = response ) => {

    const { id } = req.params;

    const tarea = await tareas.findById( id )

    res.json({

        tarea

    })

}



const crearTarea = async( req = request, res = response) => {

    const { titulo, descripcion } = req.body;

    const data = {
        titulo,
        descripcion,
        usuario: req.usuario._id,
        fecha: Date.now()
    }

    const tareas = await new Tareas(data);

    await tareas.save();

    res.json({
        tareas
    })

}

const actualizarTarea = async( req = request, res = response ) => {

    const { id } = req.params;

    const { estado, usuario, ...data } = req.body;

    const tarea = await tareas.findByIdAndUpdate(id, data, { new: true })

    res.json({
        tarea
    })

}

const eliminarTarea = async(req = request, res = response) => {

    const { id } = req.params;

    const tarea = await tareas.findByIdAndDelete(id)

    res.json({
        msg: 'Tarea eliminada satisfactoriamente' ,
        tarea
    })

}


module.exports = {
    getTareas,
    crearTarea,
    getTareasId,
    actualizarTarea,
    eliminarTarea
}