const {Router} = require('express');
const {check} = require('express-validator');
const { loginUsuario } = require('../controllers/AuthController');
const {validarCampos} = require('../middlewares/validarCampos');

const router = Router();

router.post('/login',
[
check('email','El email es obligatorio').isEmail(),
check('password','El password es obligatio y debe tener un largo de 6 a 20 caracteres').notEmpty().isLength({min:6,max:20}),
validarCampos,
],
loginUsuario)



module.exports = router;