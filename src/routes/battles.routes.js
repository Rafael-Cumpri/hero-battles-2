const express = require('express');
const router = express.Router();
const battlesController = require('../controllers/battles.controllers');

router.post('/battles/:id1/:id2', battlesController.postBattle);
router.get('/battles/:param', battlesController.getAllBattleByHeroName);
router.get('/battles', battlesController.getAllBattle);


module.exports = router;