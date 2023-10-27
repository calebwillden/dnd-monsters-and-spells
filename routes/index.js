const router = require('express').Router();

// Monsters
router.use('/', require('./swagger.js'));
router.use('/monsters', require('./monsters.js'));
router.use('/spells', require('./spells.js'));

module.exports = router;
