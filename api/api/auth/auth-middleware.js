// ----- IMPORTS -----
const User = require('../users/users-model');
const jwt = require('jsonwebtoken'); // Needed for restrict

// NON-AUTH ROUTES
function restricted (req, res, next) {
    console.log('\nrestricted');
    next();
}

// REGISTER CHECKS
// next({ status: 401, message: "username and password required"})
function checkUnPwdPhoneProvided (req, res, next) {
    console.log('\ncheckUnPwdPhoneProvided');
    next();
}
// next({ status: 422, message: "username taken"})
function checkIfUnTaken (req, res, next){
    console.log('\ncheckIfUnTaken');
    next();
}

// REGISTRATION & LOGIN
// next({ status: 422, message: "phone taken"})
function checkIfPhoneTaken (req, res, next){
    console.log('\ncheckIfPhoneTaken');
    next();
}

// LOGIN ONLY
// next({ status: 401, message: "username and password required"})
function checkUnPwdProvided (req, res, next) {
    console.log('\ncheckUnPwdProvided');
    next();
}
// next({ status: 401, message: "invalid credentials"})
function checkIfUnExists (req, res, next){
    console.log('\ncheckIfUnExists');
    next();
}


module.exports = {
    restricted,
    checkUnPwdPhoneProvided,
    checkIfUnTaken,
    checkIfPhoneTaken,
    checkUnPwdProvided,
    checkIfUnExists,
}