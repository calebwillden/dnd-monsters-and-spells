const router = require('express').Router();
const controller = require('../controllers/spell.js');

router.get('/', controller.getAllSpells);
router.get('/:id', controller.getSpellById);
router.post('/', controller.createSpell);
router.put('/:id', controller.updateSpell);
router.delete('/:id', controller.deleteSpell);

module.exports = router;
