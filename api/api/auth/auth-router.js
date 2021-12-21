// ----- IMPORTS ----- 
// Create Router & Import Model
const router = require('express').Router();
const User = require('../users/users-model');

// Import bcryptjs for hashing
const bcryptjs = require('bcryptjs');
const { BCRYPTJS_ROUNDS } = require('./secret');

// Import jsonwebtoken, jwt secret, and token builder
// const jwt = require('jsonwebtoken'); // Not needed since the token isn't created and decoded here
const { JWT_SECRET } = require('./secret')
const tokenBuilder = require('./auth-helpers');

// Import auth middleware
const { restricted, checkUnPwdPhoneProvided, checkIfUnTaken, checkIfPhoneTaken, checkUnPwdProvided, checkIfUnExists,} = require('./auth-middleware')


// ----- ROUTES -----
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
                res.status(200).json({ user_id: userFromDb.user_id, username: userFromDb.user_id, token: token });
            } else {
                next({ status: 401, message: 'invalid credentials'})
            }
        })
        .catch( next );

})
// Note: no ':user_id' in the url, add user_id to the user object
router.put('/update/', restricted, checkIfPhoneTaken, (req, res, next) => {
    const user = req.body
    const {user_id} = user;
    const updates = {password: user.password, phone_number: user.phone_number}
    updates.password = bcryptjs.hashSync(updates.password, BCRYPTJS_ROUNDS);
    
    User.update(user_id, updates)
        .then( response => {
            res.status(200).json(response);
        })
        .catch( next );
})

module.exports = router;