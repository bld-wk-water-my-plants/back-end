const db = require('../../data/db-config');

// Get all plants & species
async function findAll () {
    const allPlants = await db('plants as p')
        .join('species as s', 'p.species_id', 's.species_id')
        .select('p.plant_id', 'p.plant_nickname', 's.species_name', 's.h2o_frequency', 's.image', 's.species_id')
    return allPlants;
}
// Get all plants & species by any field, returns rows as an array
async function findByFilter (filter){ 
    const plants = await db('plants as p')
        .join('species as s', 'p.species_id', 's.species_id')
        .select('p.plant_id', 'p.plant_nickname', 's.species_name', 's.h2o_frequency', 's.image', 's.species_id')
        .where(filter)
    return plants;
}


// Creates a new species; returns ENTIRE NEW species as an object
async function createSpecies (species){    
    console.log('\nAA. Create Species: ', species)
    const [newSpecies] = await db('species')
        .insert([{species_name: species.species_name, h2o_frequency: species.h2o_frequency}], ['species_id', 'species_name', 'h2o_frequency']);
    console.log('BB. Create Species: ', newSpecies)
    return newSpecies;
}

// Create a new plant; returns the ENTIRE NEW plant + species info as an object
async function createPlant (plant){
    const [plant_id] = await db('plants')
        .insert(plant, ['plant_id']);
    const [newPlant] = await findByFilter(plant_id); // no {} since plant_id is already an obj
    return newPlant;
}

// Update a species; returns the ENTIRE UPDATE species as an object
async function updateSpecies (species){
    const [updatedSpecies] = await db('species')
        .update({h2o_frequency: species.h2o_frequency}, ['species_id', 'species_name', 'h2o_frequency'])
        .where('species_id', species.species_id);
    return updatedSpecies;
}
// Update a plant; returns the ENTIRE UPDATE plant + species info as an object
async function updatePlant (plant){    
    const [plant_id] = await db('plants')
        .update({ plant_nickname: plant.plant_nickname, species_id: plant.species_id }, ['plant_id'])
        .where('plant_id', plant.plant_id);    
    const [updatedPlant] = await findByFilter(plant_id); // no {} since plant_id is already an obj
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
    updateSpecies, 
    updatePlant,
    deletePlant,
}