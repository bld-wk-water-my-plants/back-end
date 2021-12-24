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
    console.log('Plant: ', plant)
    console.log('Middleware: ', req.species_name, req.h2o_frequency )

    // Create new species if provided not found
    if (plant.species_id === null){
        const species = { 
            species_name: req.body.species_name, 
            h2o_frequency: req.body.h2o_frequency 
        }
        console.log('Create Species: ', species)
        try {
            const newSpecies = await Plant.createSpecies(species);
            plant.species_id = newSpecies.species_id;
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
// { plant_id, plant_nickname, species_name, h2o_frequency, image (optional), species_id }
router.put('/:plant_id', checkPlantInfoProvided, checkIfSpeciesExists, async (req, res, next) => {

    // species_id is current id from body
    const species = {
        species_id: req.body.species_id,
        species_name: req.body.species_name,
        h2o_frequency: req.body.h2o_frequency
    }
    const plant = { 
        plant_nickname: req.body.plant_nickname,
        species_id: req.body.species_id,
        plant_id: Number(req.params.plant_id),
    }

    // species name provided; FOUND in db; matches current species but h2o changed; update species table
    if ( species.species_id === req.species_id && species.h2o_frequency !== req.h2o_frequency ){
        try {
            const updatedSpecies = await Plant.updateSpecies(species);
            plant.h2o_frequency = updatedSpecies.h2o_frequency;
        } catch (error) {
            next(error)
        }
    }

    // species name provided; NOT FOUND in db; create new species; add new species_id to plant obj
    if (req.species_id === null){
        try {
            const newSpecies = await Plant.createSpecies(species);
            console.log('2A-new species: ', newSpecies)
            plant.species_id = newSpecies.species_id;
            console.log('2B-plant species id: ', plant.species_id)
        } catch (error) {
            next(error)
        }      
    } 

    // species name provided; FOUND in db; species name changed; update species_id in plant obj
    else if (plant.species_id !== req.species_id )  {
        plant.species_id = req.species_id;
    }

    console.log('BeforE UpdatE: ', plant);
    const updatedPlant = await Plant.updatePlant(plant);
    console.log('After UpdatE: ', updatedPlant);
    res.status(200).json(updatedPlant);

})


// Delete a plant w. plant id (user id not needed)
router.delete('/:plant_id', (req, res, next) => {
    const plant_id = Number(req.params.plant_id)
    Plant.deletePlant(plant_id)
        .then( response => {
            res.status(204).json({ message: `plant_id ${plant_id} deleted`})
        })
        .catch( next ); 
})

module.exports = router;