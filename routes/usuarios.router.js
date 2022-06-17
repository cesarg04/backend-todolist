const { check } = require('express-validator')
const { Router } = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios.controller');
const { emailExiste, existeUsuarioporID, validarPassword } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es correcto').isEmail(),
    check('password', 'El password debe tener mas de 8 digitos').isLength({min: 8}),
    check('rol', "El rol es necesario").not().isEmpty(),
    check('email').custom( emailExiste ),
    validarCampos
],usuariosPost)

router.put('/:id', [
    check('id', 'El ID es obligatorio').not().isEmpty(),
    check('id', 'No es un ID de mongo').isMongoId(),
    check('id').custom(existeUsuarioporID),
    check('password').custom(validarPassword),
    validarCampos
], usuariosPut)

router.delete('/:id', [
    check('id', 'El ID es requerido').not().isEmpty(),
    check('id', 'No es un ID de mongo').isMongoId(),
    check('id').custom(existeUsuarioporID),
    validarCampos
],usuariosDelete)


module.exports = router;

