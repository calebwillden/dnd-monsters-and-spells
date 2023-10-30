const router = require('express').Router();
const controller = require('../controllers/monster.js');
const { validateMonster } = require('../middleware/validation.js');

router.get('/', controller.getAllMonsters);
router.get('/:id', controller.getMonsterById);
router.post('/', validateMonster, controller.createMonster);
router.put('/:id', controller.updateMonster);
router.delete('/:id', controller.deleteMonster);

module.exports = router;
