const db = require('../../data/db-config');

// Get all plants
async function findAll () {
    const allPlants = await db('plants as p')
        .join('species as s', 'p.species_id', 's.species_id')
        .select('p.plant_id', 'p.plant_nickname', 's.species_name', 's.h2o_frequency', 's.image' )
    return allPlants;
}
// Get by user_name (or other field)
async function findByFilter (filter){  // Var must be object w. key matching db field name
    const plants = await db('plants as p')
        .join('species as s', 'p.species_id', 's.species_id')
        .select('p.plant_id', 'p.plant_nickname', 's.species_name', 's.h2o_frequency', 's.image' )
        .where(filter)
    return plants;
}



async function createPlant (user_id, plant){
    const [newPlant] = await db('plants')
        .insert(plant)
        .where({user_id});
    
    console.log('NEW PLANT: ', newPlant); // <<<<<<<<<<<<<<<<<<<< What is returned?
    return newPlant;
}
async function updatePlant (plant){
    const [updatedPlant] = await db('plants')
        .update(plant)
        .where('plant_id', plant.plant_id);
    
    console.log('UPDATED PLANT: ', updatedPlant); // <<<<<<<<<<<<<<<<<<<< What is returned?
    return updatedPlant;
}
async function deletePlant (plant_id){
    const [deletedPlant] = await db('plants')
        .delete()
        .where({plant_id});
    
    console.log('DELETED PLANT: ', deletedPlant); // <<<<<<<<<<<<<<<<<<<< What is returned?
    return deletedPlant;
}



module.exports = {
    findAll,
    findByFilter,
    createPlant,
    updatePlant,
    deletePlant,
}