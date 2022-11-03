const {Router} = require('express');
const {check} = require('express-validator');
const { getHeroes,getHeroeById } = require('../controllers/HeroeController');


const router = Router();

router.get('/',getHeroes);

router.get('/:id',getHeroeById)

module.exports = router;