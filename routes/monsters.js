const router = require('express').Router();
const controller = require('../controllers/monster.js');
const {
    validateId,
    validateCreateMonster,
    validateUpdateMonster
} = require('../middleware/validation.js');

router.get('/', controller.getAllMonsters);
router.get('/:id', validateId, controller.getMonsterById);
router.post('/', validateCreateMonster, controller.createMonster);
router.put('/:id', validateUpdateMonster, controller.updateMonster);
router.delete('/:id', validateId, controller.deleteMonster);

module.exports = router;
