// ----- IMPORTS -----
const User = require('../users/users-model');
const jwt = require('jsonwebtoken'); // Needed for restricted
const { JWT_SECRET } = require('./secret')


// ----- NON-AUTH ROUTES -----
function restricted (req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return next({ status: 401, message: "Token required" })
    } else {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err){
                return next({ status: 401, message: "Token invalid" })
            } 
            req.decoded = decoded;
            next();
        })
    }
}

// ----- REGISTER ONLY -----
function checkUnPwdPhoneProvided (req, res, next) {
    const { username, password, phone_number } = req.body;
    if (username === undefined || password === undefined || phone_number === undefined){
        next({ status: 401, message: "username, password, and valid phone number required" })
    } else {
        next();
    }
}
function checkIfUnTaken (req, res, next){
    const { username } = req.body;
    User.findByFilter({username})
        .then( ([response]) => {
            if (!response){
                next();
            } else {
                next({ status: 422, message: "username taken" })
            }
        })
        .catch( next );
}

// ----- REGISTER & LOGIN -----
function checkIfPhoneTaken (req, res, next){
    const { phone_number } = req.body;
    User.findByFilter({phone_number})
        .then( ([response]) => {
            if (!response){
                next();
            } else {
                next({ status: 422, message: "phone number taken" })
            }
        })
        .catch( next );

}

// ----- LOGIN ONLY -----
function checkUnPwdProvided (req, res, next) {
    const { username, password } = req.body;
    if (username === undefined || password === undefined){
        next({ status: 401, message: "username and password required" })
    } else {
        next();
    }

}
function checkIfUnExists (req, res, next){
    const { username } = req.body;
    User.findByFilter({username})
        .then( ([response]) => {
            if (response){
                return next()
            } else {
                return next({ status: 422, message: "username not found" })
            }
        })
        .catch( next);
}


module.exports = {
    restricted,
    checkUnPwdPhoneProvided,
    checkIfUnTaken,
    checkIfPhoneTaken,
    checkUnPwdProvided,
    checkIfUnExists,
}