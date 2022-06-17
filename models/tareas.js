const { Schema, model } = require('mongoose');


const tareaSChema = Schema ({

    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true 
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    completada: {
        type: Boolean,
        default: false
    },
    fecha: {
        type: Date,
        required: true
    }

});

tareaSChema.methods.toJSON = function() {
    const { __v, usuario ,...tarea} = this.toObject();
    return tarea;
}


module.exports = model('Tareas', tareaSChema);