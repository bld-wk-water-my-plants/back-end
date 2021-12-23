// Check body for plant payload
const Plant = require('./plants-model');

// CREATE AND UPDATE
function checkPlantInfoProvided (req, res, next) {
    console.log('\ncheckPlantInfo'); // <<<<<<<<<<<<<<<<<

    if ( req.body.plant_nickname === undefined ||
         req.body.species_name === undefined ||
         req.body.h2o_frequency === undefined ){
            return next({ status: 401, message: "plant nickname, species name, and h2o frequency required" })
    }
    next();

}
function checkIfSpeciesExists (req, res, next) {
    const species_name = req.body.species_name;
    Plant.findByFilter({species_name})
    .then( ([species]) => {
        if(species){ // Found, return id
            req.species_id = species.species_id;
            req.h2o_frequency = species.h2o_frequency;
            next();
        } else { // Not Found, return null
            req.species_id = null;
            req.h2o_frequency = null;
            next()
        }
    })
    .catch( next );
}


module.exports = {
    checkPlantInfoProvided,
    checkIfSpeciesExists,
}