const { Router } = require('express');
const { check } = require('express-validator');
const { crearTarea, getTareas, getTareasId, actualizarTarea, eliminarTarea, actualizarEstadoTarea } = require('../controllers/tareas.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');

const router = Router();

// Obtener tareas
router.get('/',[
    validarJWT
], getTareas)

// Obtener tareas por ID

router.get('/:id',[
    validarJWT
] ,getTareasId)


// Crear tarea

router.post('/', [
    validarJWT,
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos
],crearTarea)


router.put('/:id', [
    validarJWT,
    check('id', 'Se necesita el ID').not().isEmpty(),
    check('id', 'No es un ID de mongo').isMongoId(),
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos
],actualizarTarea)

// Actualizar estado de la tarea
router.put('/complete/:id', [
    validarJWT
], actualizarEstadoTarea)

router.delete('/:id', [
    validarJWT
],eliminarTarea)


module.exports = router

