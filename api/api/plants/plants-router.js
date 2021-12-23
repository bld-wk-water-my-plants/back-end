// ----- IMPORTS -----
const router = require('express').Router();
const Plant = require('./plants-model');
const { checkPlantInfoProvided, checkIfSpeciesExists, } = require('./plant-middleware');

// ----- ROUTES -----
// Get all plants in DB
// FOR TESTING ONLY - REMOVE BEFORE FINALIZED
router.get('/', (req, res, next) => {
    Plant.findAll()
        .then( response => {
            res.status(200).json(response)
        })
        .catch( next );
})

// Get plants by user id
router.get('/:user_id', (req, res, next) => {
    const { user_id } = req.params
    Plant.findByFilter({user_id})
        .then( response => {
            res.status(200).json(response)
        })
        .catch( next );
})

// Add a plant w. user id 
router.post('/:user_id', checkPlantInfoProvided, checkIfSpeciesExists, async (req, res, next) => {
    // Next time, have client incl user_id in the body
    const plant = { plant_nickname: req.body.plant_nickname }
    plant.species_id = req.species_id; // Set by middleware
    plant.user_id = Number(req.params.user_id);
    
    // Create new species if provided not found
    if (plant.species_id === null){
        const species = { 
            species_name: plant.species_name, 
            h2o_frequency: plant.h2o_frequency 
        }
        try {
            plant.species_id = await Plant.createSpecies(species);
        } catch (error) {
            next(error)
        }
    }
    //Create new plant
    Plant.createPlant(plant)
        .then( response => {
            res.status(201).json(response)
        })
        .catch( next );

})



// Update a plant w. plant id (user id not needed)
router.put('/:plant_id', checkPlantInfoProvided, (req, res, next) => {
    res.send('<h1>UPDATE PLANT BY PLANT ID</h1>')
})

// Delete a plant w. plant id (user id not needed)
router.delete('/:plant_id', (req, res, next) => {
    res.send('<h1>DELETE PLANT BY PLANT ID</h1>')
})

module.exports = router;