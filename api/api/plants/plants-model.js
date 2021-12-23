const db = require('../../data/db-config');

// Get all plants & species
async function findAll () {
    const allPlants = await db('plants as p')
        .join('species as s', 'p.species_id', 's.species_id')
        .select('p.plant_id', 'p.plant_nickname', 's.species_name', 's.h2o_frequency', 's.image' )
    return allPlants;
}

// Get all plants & species by any field, returns rows as an array
async function findByFilter (filter){ 
    const plants = await db('plants as p')
        .join('species as s', 'p.species_id', 's.species_id')
        .select('p.plant_id', 'p.plant_nickname', 's.species_name', 's.h2o_frequency', 's.image', 's.species_id' )
        .where(filter)
    return plants;
}

// Creates a new species; returns the species_id as an integer
async function createSpecies (species){
    const [newSpecies] = await db('species')
        .insert(species, ['species_id']);
    return newSpecies.species_id;
}

// Create a new plant; returns the new plant as an object
async function createPlant (plant){
    // create and return new plant id obj
    const [plant_id] = await db('plants')
        .insert(plant, ['plant_id']);
    // get new plant by id
    // No {} since plant_id is already an obj
    const [newPlant] = await findByFilter(plant_id); 
    return newPlant;
}



async function updatePlant (plant){
    const [updatedPlant] = await db('plants')
        .update(plant)
        .where('plant_id', plant.plant_id);
    
    console.log('UPDATED PLANT: ', updatedPlant); // <<<<<<<<<<< What is returned?
    return updatedPlant;
}
async function deletePlant (plant_id){
    const [deletedPlant] = await db('plants')
        .delete()
        .where({plant_id});
    
    console.log('DELETED PLANT: ', deletedPlant); // <<<<<<<<<< What is returned?
    return deletedPlant;
}



module.exports = {
    findAll,
    findByFilter,
    createSpecies,
    createPlant,
    updatePlant,
    deletePlant,
}