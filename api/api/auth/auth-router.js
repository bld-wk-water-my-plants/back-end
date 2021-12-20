// ----- IMPORTS ----- 
// Create Router & Import Model
const router = require('express').Router();
const User = require('../users/users-model');

// Import bcryptjs for hashing
const bcryptjs = require('bcryptjs');
const BCRYPTJS_ROUNDS = 8;

// Import jsonwebtoken, jwt secret, and token builder
// const jwt = require('jsonwebtoken'); // Not needed since the token isn't created and decoded here
const { JWT_SECRET } = require('./secret')
const tokenBuilder = require('./auth-helpers');

// Import auth middleware
const { restricted, checkUnPwdPhoneProvided, checkIfUnTaken, checkIfPhoneTaken, checkUnPwdProvided, checkIfUnExists,} = require('./auth-middleware')

// READ ME
// REGISTER: [POST] ('/api/auth/register') 
// Body: { username, password, phone_number } <- All strings; phone_number format ###-###-####
// Returns: { user_id, username, phone_number }

// LOGIN: [POST] ('/api/auth/login') 
// Body: { username, password } <- All strings
// Returns: { user_id, token }

// UPDATE: [PUT] ('/api/auth/update') 
// Body: { user_id, password, phone_number } <- user_id is an integer; password & phone_number are strings; phone_number format ###-###-####
// Returns: { user_id, phone_number }

router.post('/register', checkUnPwdPhoneProvided, checkIfUnTaken, checkIfPhoneTaken, (req, res, next) => {
    const user = req.body;
    user.password = bcryptjs.hashSync(user.password, BCRYPTJS_ROUNDS);
    User.create(user)
        .then( response => {
            res.status(201).json(response)
        })
        .catch( next );
})

router.post('/login', checkUnPwdProvided, checkIfUnExists, (req, res, next) => {
    const {username, password} = req.body;
    User.findByFilter( {username} ) // REMEMBER: Pass username variable as an object
        .then( ([userFromDb]) => {
            if (bcryptjs.compareSync(password, userFromDb.password)){
                const token = tokenBuilder(userFromDb);
                res.status(200).json({ user_id: userFromDb.user_id, token: token });
            } else {
                next({ status: 401, message: 'invalid credentials'})
            }
        })
        .catch( next );

})



// UPDATE
// Hash pwd -> Pass un + hash to db
// Call token builder and pass token back
router.put('/update', restricted, checkIfPhoneTaken, (req, res, next) => {
    const user = req.body;
    console.log('1. Router - User: ', user);
    User.update(user)
        .then( response => {
            res.status(200).json(response);
        })
        .catch( next );


})

module.exports = router;