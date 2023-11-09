const router = require('express').Router();
const controller = require('../controllers/monster.js');
const {
    validateId,
    validateCreateMonster,
    validateUpdateMonster
} = require('../middleware/validation.js');
const { requiresAuth } = require('express-openid-connect');

router.get('/', controller.getAllMonsters);
router.get('/:id', validateId, controller.getMonsterById);
router.post('/', requiresAuth(), validateCreateMonster, controller.createMonster);
router.put('/:id', requiresAuth(), validateUpdateMonster, controller.updateMonster);
router.delete('/:id', requiresAuth(), validateId, controller.deleteMonster);

module.exports = router;
