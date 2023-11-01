const { check } = require('express-validator');

const validateId = [
    check('id')
        .isAlphanumeric()
        .isLength({ min: 24, max: 24 })
        .withMessage('ID must be an alphanumeric string of exactly 24 characters.')
];

const validateCreateMonster = [
    check('name').isString(),
    check('str')
        .isInt({ min: 1, max: 30 })
        .withMessage('Ability score must be an integer between 1 and 30.'),
    check('dex')
        .isInt({ min: 1, max: 30 })
        .withMessage('Ability score must be an integer between 1 and 30.'),
    check('con')
        .isInt({ min: 1, max: 30 })
        .withMessage('Ability score must be an integer between 1 and 30.'),
    check('int')
        .isInt({ min: 1, max: 30 })
        .withMessage('Ability score must be an integer between 1 and 30.'),
    check('wis')
        .isInt({ min: 1, max: 30 })
        .withMessage('Ability score must be an integer between 1 and 30.'),
    check('cha')
        .isInt({ min: 1, max: 30 })
        .withMessage('Ability score must be an integer between 1 and 30.')
];

const validateUpdateMonster = [
    ...validateId,
    check('name').isString().optional(),
    check('str')
        .isInt()
        .optional()
        .isInt({ min: 1, max: 30 })
        .withMessage('Ability score must be an integer between 1 and 30.'),
    check('dex')
        .isInt()
        .optional()
        .isInt({ min: 1, max: 30 })
        .withMessage('Ability score must be an integer between 1 and 30.'),
    check('con')
        .isInt()
        .optional()
        .isInt({ min: 1, max: 30 })
        .withMessage('Ability score must be an integer between 1 and 30.'),
    check('int')
        .isInt()
        .optional()
        .isInt({ min: 1, max: 30 })
        .withMessage('Ability score must be an integer between 1 and 30.'),
    check('wis')
        .isInt()
        .optional()
        .isInt({ min: 1, max: 30 })
        .withMessage('Ability score must be an integer between 1 and 30.'),
    check('cha')
        .isInt()
        .optional()
        .isInt({ min: 1, max: 30 })
        .withMessage('Ability score must be an integer between 1 and 30.')
];

const validateCreateSpell = [check('name').isString(), check('description').isString()];

const validateUpdateSpell = [
    ...validateId,
    check('name').isString().optional(),
    check('description').isString().optional()
];

module.exports = {
    validateId,
    validateCreateMonster,
    validateCreateSpell,
    validateUpdateMonster,
    validateUpdateSpell
};
