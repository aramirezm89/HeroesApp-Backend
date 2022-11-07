const {Router} = require('express');
const { check } = require('express-validator');
const { getHeroes,getHeroeById, crearHeroe, actualizarHeroe, eliminarHeroe } = require('../controllers/HeroeController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarAdminRole } = require('../middlewares/validarRole');


const router = Router();

router.get('/',getHeroes);

router.get('/:id',getHeroeById)

router.post("/crear", [
  validarJWT,
  validarAdminRole,
  check("superhero", "Campo obligatorio").notEmpty(),
  check("publisher","Campo obligatorio").notEmpty(),
  check("alter_ego","Campo obligatorio").notEmpty(),
  check("first_appearance","Campo obligatorio").notEmpty(),
  check("characters","Campo obligatorio").notEmpty(),
  check("imageId","Campo obligatorio").notEmpty(),
  validarCampos
],crearHeroe);

router.put(
  "/actualizar/:id",
  [
    validarJWT,
    validarAdminRole,
    validarCampos,
  ],
  actualizarHeroe
);

router.delete('/:id',[validarJWT,validarAdminRole],eliminarHeroe)
module.exports = router;