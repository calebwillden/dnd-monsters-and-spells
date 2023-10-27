const router = require('express').Router();
const controller = require('../controllers/monster.js');

router.get('/', controller.getAllMonsters);
router.get('/:id', controller.getMonsterById);
router.post('/', controller.createMonster);
router.put('/:id', controller.updateMonster);
router.delete('/:id', controller.deleteMonster);

module.exports = router;
