const router = require('express').Router();
const controller = require('../controllers/spell.js');
const {
    validateId,
    validateCreateSpell,
    validateUpdateSpell
} = require('../middleware/validation.js');
const { requiresAuth } = require('express-openid-connect');

router.get('/', controller.getAllSpells);
router.get('/:id', validateId, controller.getSpellById);
router.post('/', requiresAuth(), validateCreateSpell, controller.createSpell);
router.put('/:id', requiresAuth(), validateUpdateSpell, controller.updateSpell);
router.delete('/:id', requiresAuth(), validateId, controller.deleteSpell);

module.exports = router;
