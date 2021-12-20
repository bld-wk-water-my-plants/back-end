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
const tokenBuiler = require('./auth-helpers');

// Import auth middleware
const { restricted, checkUnPwdPhoneProvided, checkIfUnTaken, checkIfPhoneTaken, checkUnPwdProvided, checkIfUnExists,} = require('./auth-middleware')


// ----- END POINTS ----- 
// REGISTER
// Call middleware to check un / pwd  -> Error msgs
// Hash pwd -> Pass un + hash to db
// Respond w. 201
router.post('/register', checkUnPwdPhoneProvided, checkIfUnTaken, checkIfPhoneTaken, (req, res, next) => {
    res.send('<h1>REGISTER!</h1>')
})


// LOGIN
// Call middleware to check un / pwd  -> Error msgs
// Check if name exists in the DB and if it does, hash provided pwd and compare to db
// If pwd match, call token builder and pass back token
// If pwd doesn't match, Error: { status: 401, message: 'Invalid Credentials' 
router.post('/login', checkUnPwdProvided, checkIfUnExists, (req, res, next) => {
    res.send('<h1>LOGIN!</h1>')

})

// UPDATE
// After login - restricted <<<<<<<<<<<<<< ???????? Prevent need to check for un and pwd
// Validate token -> Pull u_id and un
// Call middleware to check if phone already exists --> error msg
// Hash pwd -> Pass un + hash to db
// Call token builder and pass token back
router.put('/update', restricted, checkIfPhoneTaken, (req, res, next) => {
    res.send('<h1>LOGIN!</h1>')

})

module.exports = router;