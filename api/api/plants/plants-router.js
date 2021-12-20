// ----- IMPORTS -----
const router = require('express').Router();
const Plant = require('./plants-model');
const { checkPlantInfo } = require('./plant-middleware');

// ----- ROUTES -----
// Get all plants in DB
router.get('/', (req, res, next) => {
    res.send('<h1>ALL PLANTS</h1>')
})

// Get plants by user id
router.get('/:id', (req, res, next) => {
    res.send('<h1>GET PLANTS BY USER ID</h1>')
})

// Add a plant w. user id <<< ??? (user info stored in token?)
router.post('/:id', checkPlantInfo, (req, res, next) => {
    res.send('<h1>ADD PLANTS TO USER ID</h1>')
})

// Update a plant w. plant id (user id not needed)
router.put('/:id', checkPlantInfo, (req, res, next) => {
    res.send('<h1>UPDATE PLANT BY PLANT ID</h1>')
})

// Delete a plant w. plant id (user id not needed)
router.delete('/:id', (req, res, next) => {
    res.send('<h1>DELETE PLANT BY PLANT ID</h1>')
})

module.exports = router;