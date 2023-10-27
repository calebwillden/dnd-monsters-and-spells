const MonsterModel = require('../models/monster.js');

/*******************************************************************************
 * GET ALL MONSTERS
 * /monsters
 ******************************************************************************/
const getAllMonsters = async (req, res) => {
    //  #swagger.tags = ['Monsters']
    //  #swagger.summary = 'Get all monsters.'
    //  #swagger.description = 'Retrieves all monsters from the database.'

    const allMonsters = await MonsterModel.find();
    res.send(allMonsters);

    /*   #swagger.responses[200] = {
           description: 'Retrieved',
           schema: { $ref: '#/definitions/MonsterOutput' }
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

    const monster = await MonsterModel.findById(req.params.id);
    res.send(monster);

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

    // Verify all fields are present
    const monsterData = req.body;
    if (
        typeof monsterData.name != 'string' ||
        typeof monsterData.str != 'number' ||
        typeof monsterData.dex != 'number' ||
        typeof monsterData.wis != 'number' ||
        typeof monsterData.int != 'number' ||
        typeof monsterData.wis != 'number' ||
        typeof monsterData.cha != 'number'
    ) {
        throw 'ERR_INVALID_OR_MISSING_FIELD';
    }

    // Create Monster
    const monster = new MonsterModel(monsterData);
    await monster.save();

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
    /*  #swagger.responses[204] = {
            description: 'Updated'
        }   
    */
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
    /*  #swagger.responses[200] = {
            description: 'Deleted'
        }
    */
};

module.exports = {
    getAllMonsters,
    getMonsterById,
    createMonster,
    updateMonster,
    deleteMonster
};
