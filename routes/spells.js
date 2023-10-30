const router = require('express').Router();
const controller = require('../controllers/spell.js');
const { validateCreateSpell, validateUpdateSpell } = require('../middleware/validation.js');

router.get('/', controller.getAllSpells);
router.get('/:id', controller.getSpellById);
router.post('/', validateCreateSpell, controller.createSpell);
router.put('/:id', validateUpdateSpell, controller.updateSpell);
router.delete('/:id', controller.deleteSpell);

module.exports = router;
