const {Router} = require('express');
const { check } = require("express-validator");
const {crearUsuario} = require("../controllers/UsuarioController");
const { validarCampos } = require('../middlewares/validarCampos');


const router = Router();

router.post('/crear',
[
    check("username","Campo username es requerido").notEmpty(),
    check("email","Campo email es requerido y debe ser un email valido").isEmail(),
    check("password","Campo password es requerido, minimo 6 y maximo 20 caracteres").notEmpty().isLength({min:6,max:20}),
    validarCampos,

],
crearUsuario
)


module.exports = router;