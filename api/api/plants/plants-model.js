const db = require('../../data/db-config');

function findAll () {
    return db('plants')
}
function findById (id){
    return db('plants').where('id', id)
}
function findByFilter (filter){ 
    return db('plants').where({filter})
}

async function createPlant (plant){
    const [newPlant] = await db('plants').insert(plant);
    console.log('NEW PLANT: ', newPlant); // <<<<<<<<<<<<<<<<<<<< What is returned?
    return newPlant;
}
async function updatePlant (id, plant){
    const [updatedPlant] = await db('plants').update(plant).where('plant_id', id);
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