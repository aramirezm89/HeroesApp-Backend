const {Router} = require('express');
const {check} = require('express-validator');
const { getHeroes } = require('../controllers/HeroeController');


const router = Router();

router.get('/',getHeroes);

module.exports = router;