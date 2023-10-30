const { body } = require('express-validator');

const validateMonster = [
    body('name').isString(),
    body('str').isInt(),
    body('dex').isInt(),
    body('con').isInt(),
    body('int').isInt(),
    body('wis').isInt(),
    body('cha').isInt()
];

const validateSpell = [body('name').isString(), body('description').isString()];

module.exports = { validateMonster, validateSpell };
