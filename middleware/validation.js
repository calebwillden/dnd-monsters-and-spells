const { body } = require('express-validator');

const validateCreateMonster = [
    body('name').isString(),
    body('str').isInt(),
    body('dex').isInt(),
    body('con').isInt(),
    body('int').isInt(),
    body('wis').isInt(),
    body('cha').isInt()
];

const validateUpdateMonster = [
    body('name').isString().optional(),
    body('str').isInt().optional(),
    body('dex').isInt().optional(),
    body('con').isInt().optional(),
    body('int').isInt().optional(),
    body('wis').isInt().optional(),
    body('cha').isInt().optional()
];

const validateCreateSpell = [body('name').isString(), body('description').isString()];

const validateUpdateSpell = [
    body('name').isString().optional(),
    body('description').isString().optional()
];

module.exports = {
    validateCreateMonster,
    validateCreateSpell,
    validateUpdateMonster,
    validateUpdateSpell
};
