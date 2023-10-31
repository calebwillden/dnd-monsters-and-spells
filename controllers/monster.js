const MonsterModel = require('../models/monster.js');
const { validationResult } = require('express-validator');

/*******************************************************************************
 * GET ALL MONSTERS
 * /monsters
 ******************************************************************************/
const getAllMonsters = async (req, res) => {
    //  #swagger.tags = ['Monsters']
    //  #swagger.summary = 'Get all monsters.'
    //  #swagger.description = 'Retrieves all monsters from the database.'

    try {
        const allMonsters = await MonsterModel.find();
        res.send(allMonsters);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

    /*   #swagger.responses[200] = {
           description: 'Retrieved',
           schema: { $ref: '#/definitions/MonsterOutputArray' }
        }   
    */
};

/*******************************************************************************
 * GET MONSTER BY ID
 * /monsters/:id
 ******************************************************************************/
const getMonsterById = async (req, res) => {
    //  #swagger.tags = ['Monsters']
    //  #swagger.summary = 'Get a monster by ID.'
    //  #swagger.description = 'Retrieves one monster from the database.'
    /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'The ID for the monster to be retrieved.',
            required: true,
            schema: { $ref: '#definitions/MonsterId' }
        }   
    */

    try {
        const monster = await MonsterModel.findById(req.params.id);
        res.send(monster);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

    /*   #swagger.responses[200] = {
           description: 'Retrieved',
           schema: { $ref: '#/definitions/MonsterOutput' }
        }   
    */
};

/*******************************************************************************
 * CREATE MONSTER
 * /monsters
 ******************************************************************************/
const createMonster = async (req, res) => {
    //  #swagger.tags = ['Monsters']
    //  #swagger.summary = 'Create a monster.'
    //  #swagger.description = 'Create a monster and insert it into the database.'
    /*  #swagger.parameters['monster'] = {
            in: 'body',
            description: 'The monster object to be inserted.',
            required: true,
            schema: { $ref: '#/definitions/MonsterInput' }
        }   
    */

    try {
        // Return validation errors, if any
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.send({ errors: result.array() });
            return;
        }

        // Create Monster
        console.log('Creating Monster...');

        const monsterData = req.body;
        const monster = await MonsterModel.create(monsterData);

        console.log('Created.');

        // Return success message
        res.status(201).json({
            info: 'MONSTER_CREATED',
            monsterId: monster._id
        });
        /*  #swagger.responses[201] = {
                description: 'Created',
                schema: {
                    info: 'MONSTER_CREATED',
                    monsterId: { $ref: '#/definitions/MonsterId' }
                }
            } 
        */
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

/*******************************************************************************
 * UPDATE MONSTER
 * /monsters
 ******************************************************************************/
const updateMonster = async (req, res) => {
    //  #swagger.tags = ['Monsters']
    //  #swagger.summary = 'Update a monster.'
    //  #swagger.description = 'Update one monster in the database.'
    /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'The ID for the monster to be retrieved.',
            required: true,
            schema: { $ref: '#definitions/MonsterId' }
        }   
    */
    /*  #swagger.parameters['monster'] = {
            in: 'body',
            description: 'An object of monster properties to be updated and their new values.',
            required: true,
            schema: { $ref: '#/definitions/MonsterInput' }
        }   
    */

    try {
        console.log('Updating Monster...');

        const id = req.params.id;
        const updates = req.body;
        const result = await MonsterModel.findByIdAndUpdate(id, updates);

        // Update Error (result is null)
        if (!result) {
            throw 'ERR_DATABASE_ERROR';
        }

        // Successful Update
        console.log('Updated.');
        res.status(204).send();
        /*  #swagger.responses[204] = {
                description: 'Updated'
            }   
        */
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

/*******************************************************************************
 * DELETE MONSTER
 * /monsters
 ******************************************************************************/
const deleteMonster = async (req, res) => {
    //  #swagger.tags = ['Monsters']
    //  #swagger.summary = 'Delete a monster.'
    //  #swagger.description = 'Drops one monster from the database.'
    /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'The ID for the monster to be deleted.',
            required: true,
            schema: { $ref: '#/definitions/MonsterId' }
        }
    */
    try {
        console.log('Deleting Monster...');

        const id = req.params.id;
        const result = await MonsterModel.findByIdAndDelete(id);

        // Update Error (result is null)
        if (!result) {
            throw 'ERR_DATABASE_ERROR';
        }

        console.log('Deleted.');

        res.status(200).send();
        /*  #swagger.responses[200] = {
           description: 'Deleted'
        }
        */
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

module.exports = {
    getAllMonsters,
    getMonsterById,
    createMonster,
    updateMonster,
    deleteMonster
};
