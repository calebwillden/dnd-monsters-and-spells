const fs = require('fs');
const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

// Swagger AutoGen Config
const doc = {
    info: {
        title: 'D&D Monsters & Spells API',
        description: 'This API returns information about D&D monsters and spells.'
    },
    host: process.env.DEPLOYED_HOST,
    schemes: ['https'],
    tags: ['Monsters', 'Spells'],
    definitions: {
        MonsterId: '653adc447f20bf502d67d4b8',
        MonsterInput: {
            name: 'Flumph',
            str: 10,
            dex: 12,
            con: 8,
            wis: 12,
            int: 8,
            cha: 10
        },
        MonsterOutput: {
            _id: '653aefdf7e31c8e546fd97a9',
            name: 'Flumph',
            str: 10,
            dex: 12,
            con: 8,
            wis: 12,
            int: 8,
            cha: 10
        },
        MonsterOutputArray: [{ $ref: '#/definitions/MonsterOutput' }],
        SpellId: '653adc767f20bf502d6802e6',
        SpellInput: {
            name: 'Burning Hands',
            description: 'Shoots fire. Woo.'
        },
        SpellOutput: {
            _id: { $ref: '#/definitions/SpellId' },
            name: 'Burning Hands',
            description: 'Shoots fire. Woo.'
        },
        SpellOutputArray: [{ $ref: '#/definitions/SpellOutput' }]
    }
};

const prodSwaggerJsonFilePath = './api-docs/swagger-output-prod.json';
const devSwaggerJsonFilePath = './api-docs/swagger-output-dev.json';
const endpointsFiles = ['../server.js'];

swaggerAutogen(prodSwaggerJsonFilePath, endpointsFiles, doc).then(() => {
    // After generating the production JSON, create a dev version
    // Copy the JSON file
    const prodSwaggerJsonFileData = fs.readFileSync(prodSwaggerJsonFilePath, 'utf8');
    const prodSwaggerJson = JSON.parse(prodSwaggerJsonFileData);
    const devSwaggerJson = Object.assign({}, prodSwaggerJson);

    // Set host and schema to work with localhost
    devSwaggerJson.host = `localhost:${process.env.PORT}`;
    devSwaggerJson.schemes = ['http'];

    // Save it to a new file
    fs.writeFileSync(devSwaggerJsonFilePath, JSON.stringify(devSwaggerJson));

    // Run the server (for testing)
    require('../server.js');
});
