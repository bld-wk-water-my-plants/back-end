const db = require('../../data/db-config');

function findAll () {
    return db('plants');
}
function findById (plant_id){
    return db('plants').where({plant_id});
}
function findByFilter (filter){  // REMEMBER: Variable name must match table field name
    return db('plants').where({filter});
}

async function createPlant (user_id, plant){
    const [newPlant] = await db('plants').insert(plant).where({user_id});
    console.log('NEW PLANT: ', newPlant); // <<<<<<<<<<<<<<<<<<<< What is returned?
    return newPlant;
}
async function updatePlant (plant){
    const [updatedPlant] = await db('plants').update(plant).where('plant_id', plant.plant_id);
    console.log('UPDATED PLANT: ', updatedPlant); // <<<<<<<<<<<<<<<<<<<< What is returned?
    return updatedPlant;
}
async function deletePlant (plant_id){
    const [deletedPlant] = await db('plants').delete().where({plant_id});
    console.log('DELETED PLANT: ', deletedPlant); // <<<<<<<<<<<<<<<<<<<< What is returned?
    return deletedPlant;
}

module.exports = {
    findAll,
    findById,
    findByFilter,
    createPlant,
    updatePlant,
    deletePlant,
}