require('dotenv').config();
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const { requiresAuth } = require('express-openid-connect');

// Choose a JSON based on the environment
const swaggerDocPath =
    process.env.HOST == 'localhost'
        ? '../api-docs/swagger-output-dev.json'
        : '../api-docs/swagger-output-prod.json';
const swaggerDoc = require(swaggerDocPath);

// Prepare swagger UI
router.use('/api-docs', swaggerUi.serve);

// Docs Route
router.get(
    '/api-docs',
    requiresAuth(),
    swaggerUi.setup(swaggerDoc)
    // #swagger.ignore = true
);

// Redirect root route to API docs
router.get('/', (req, res) => {
    res.redirect('/api-docs');
    // #swagger.ignore = true
});

module.exports = router;
