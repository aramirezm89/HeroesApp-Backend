const {Router} = require('express');
const { getHeroes,getHeroeById } = require('../controllers/HeroeController');


const router = Router();

router.get('/',getHeroes);

router.get('/:id',getHeroeById)

module.exports = router;