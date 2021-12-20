// Check body for plant payload
const Plant = require('./plants-model');

function checkPlantInfo (req, res, next) {
    console.log('\ncheckPlantInfo');
    next();
}

module.exports = {
    checkPlantInfo,
}