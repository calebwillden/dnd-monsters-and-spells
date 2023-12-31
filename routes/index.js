const router = require('express').Router();
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config();

/*******************************************************************************
 * O AUTH
 ******************************************************************************/
const baseURL =
    process.env.HOST == 'localhost'
        ? `${process.env.SCHEME}://${process.env.HOST}:${process.env.PORT}`
        : `${process.env.SCHEME}://${process.env.HOST}`;

console.log(baseURL);

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: baseURL,
    clientID: 'YmfFsLEPUfajp5XNCctHUAhp7GJNO6Ba',
    issuerBaseURL: 'https://dev-xtkmrw7t45ao5452.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

/*******************************************************************************
 * API ROUTES
 ******************************************************************************/
router.use('/', require('./swagger.js'));
router.use('/monsters', require('./monsters.js'));
router.use('/spells', require('./spells.js'));

module.exports = router;
