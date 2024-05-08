const express = require('express');
const router = express.Router();
const heroesController = require('../controllers/heroes.controllers');

router.post('/heroes', heroesController.createHero);
router.get('/heroes', heroesController.getAllHeros);
router.get('/heroes/:param', heroesController.getHeroByParam);
router.put('/heroes/:id', heroesController.updateHero);
router.delete('/heroes/:id', heroesController.deleteHero);

module.exports = router;