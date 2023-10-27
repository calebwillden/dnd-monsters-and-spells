const SpellModel = require('../models/spell.js');

/*******************************************************************************
 * GET ALL SPELLS
 * /spells
 ******************************************************************************/
const getAllSpells = async (req, res) => {
    //  #swagger.tags = ['Spells']
    //  #swagger.summary = 'Get all spells.'
    //  #swagger.description = 'Retrieves all spells from the database.'

    const allSpells = await SpellModel.find();
    res.send(allSpells);

    /*   #swagger.responses[200] = {
           description: 'Retrieved',
           schema: { $ref: '#/definitions/SpellOutput' }
        }   
    */
};

/*******************************************************************************
 * GET SPELL BY ID
 * /spell/:id
 ******************************************************************************/
const getSpellById = async (req, res) => {
    //  #swagger.tags = ['Spells']
    //  #swagger.summary = 'Get a spell by ID.'
    //  #swagger.description = 'Retrieves one spell from the database.'
    /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'The ID for the contact to be retrieved.',
            required: true,
            schema: { $ref: '#definitions/SpellId' }
        }   
    */

    try {
        const spell = await SpellModel.findById(req.params.id);
        res.send(spell);
        /*  #swagger.responses[200] = {
                description: 'Retrieved',
                schema: { $ref: '#/definitions/SpellOutput' }
            }   
        */
    } catch (err) {
        res.status(500).send({ info: 'ERR_SERVER_ERROR' });
    }
};

/*******************************************************************************
 * CREATE SPELL
 * /spell
 ******************************************************************************/
const createSpell = async (req, res) => {
    //  #swagger.tags = ['Spells']
    //  #swagger.summary = 'Create a spell.'
    //  #swagger.description = 'Create a spell and insert it into the database.'
    /*  #swagger.parameters['spell'] = {
            in: 'body',
            description: 'The spell object to be inserted.',
            required: true,
            schema: { $ref: '#/definitions/SpellInput' }
        }   
    */

    // Verify all fields are present
    const spellData = req.body;
    if (typeof spellData.name != 'string' || typeof spellData.description != 'string') {
        throw 'ERR_INVALID_OR_MISSING_FIELD';
    }

    // Create Spell
    const spell = await SpellModel.create(spellData);

    // Return success message
    res.status(201).send({
        spellId: spell._id
    });

    /*  #swagger.responses[201] = {
            description: 'Created',
            schema: {
                contactId: { $ref: '#/definitions/SpellId' }
            }
        } 
    */
};

/*******************************************************************************
 * UPDATE SPELL
 * /spells
 ******************************************************************************/
const updateSpell = async (req, res) => {
    //  #swagger.tags = ['Spells']
    //  #swagger.summary = 'Update a spell.'
    //  #swagger.description = 'Update one spell in the database.'
    /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'The ID for the spell to be retrieved.',
            required: true,
            schema: { $ref: '#definitions/SpellId' }
        }   */
    /*  #swagger.parameters['spell'] = {
            in: 'body',
            description: 'An object of spell properties to be updated and their new values.',
            required: true,
            schema: { $ref: '#/definitions/SpellInput' }
        }   */

    try {
        console.log('Updating Spell...');

        const id = req.params.id;
        const updates = req.body;
        const result = await SpellModel.findByIdAndUpdate(id, updates);

        // Update Error (result is null)
        if (!result) {
            throw 'ERR_DATABASE_ERROR';
        }

        // Successful Update
        console.log('Complete.');
        res.status(204).send();
        /*  #swagger.responses[204] = {
                description: 'Updated'
            }   
        */
    } catch (err) {
        // Send an Error
        res.status(500).send({ info: err });
        console.log(`Aborted. Error: ${err}`);
        /*  #swagger.responses[500] = {
                description: 'Database Error'
            }   
        */
    }
};

/*******************************************************************************
 * DELETE SPELL
 * /spell
 ******************************************************************************/
const deleteSpell = async (req, res) => {
    //  #swagger.tags = ['Spells']
    //  #swagger.summary = 'Delete a spell.'
    //  #swagger.description = 'Drops one spell from the database.'
    /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'The ID for the spell to be deleted.',
            required: true,
            schema: { $ref: '#/definitions/SpellId' }
        }
    */

    console.log('Deleting Spell...');

    const id = req.params.id;
    const result = await SpellModel.findByIdAndDelete(id);
    console.log('Complete.');

    res.status(200).send();

    /*  #swagger.responses[200] = {
            description: 'Deleted'
        }
    */
};

module.exports = {
    getAllSpells,
    getSpellById,
    createSpell,
    updateSpell,
    deleteSpell
};
