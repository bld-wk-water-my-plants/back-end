// Check body for plant payload
const Plant = require('./plants-model');

// CREATE AND UPDATE
function checkPlantInfo (req, res, next) {
    console.log('\ncheckPlantInfo');
    next();
}

module.exports = {
    checkPlantInfo,
}