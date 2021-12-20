// ----- IMPORTS -----
const router = require('express').Router();
const Plant = require('./plants-model');
const { checkPlantInfo } = require('./plant-middleware');

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

// Get plants by user id - OKAY
router.get('/:user_id', (req, res, next) => {
    const { user_id } = req.params
    Plant.findByFilter({user_id})
        .then( response => {
            res.status(200).json(response)
        })
        .catch( next );
})




// Add a plant w. user id 
router.post('/:user_id', checkPlantInfo, (req, res, next) => {
    const {user_id} = req.params;
    const plant = req.body;
    Plant.createPlant(user_id, plant)
        .then( response => {
            res.status(201).json(response)
        })
        .catch( next );
})

// Update a plant w. plant id (user id not needed)
router.put('/:plant_id', checkPlantInfo, (req, res, next) => {
    res.send('<h1>UPDATE PLANT BY PLANT ID</h1>')
})

// Delete a plant w. plant id (user id not needed)
router.delete('/:plant_id', (req, res, next) => {
    res.send('<h1>DELETE PLANT BY PLANT ID</h1>')
})

module.exports = router;