const {Router} = require('express');
const { check } = require("express-validator");
const {crearUsuario, eliminarUsuario, actualizarUsuario,cargarUsuarios} = require("../controllers/UsuarioController");
const { validarCampos } = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validar-jwt');
const { validarAdminRole } = require('../middlewares/validarRole');

const router = Router();

router.get('/',[validarJWT],cargarUsuarios)


router.post('/crear',
[
    validarJWT,
    validarAdminRole,
    check("username","Campo username es requerido").notEmpty(),
    check("email","Campo email es requerido y debe ser un email valido").isEmail(),
    check("password","Campo password es requerido, minimo 6 y maximo 20 caracteres").notEmpty().isLength({min:6,max:20}),
    validarCampos,

],
crearUsuario
)

router.put(
  "/editar/:id",
  [
    validarJWT,
    validarAdminRole,
    check("username", "Campo username es requerido").notEmpty(),
    check( "email", "Campo email es requerido y debe ser un email valido" ).isEmail(),
    validarCampos,
  ],
  actualizarUsuario
);

router.delete('/:id',[validarJWT,validarAdminRole],eliminarUsuario)


module.exports = router;