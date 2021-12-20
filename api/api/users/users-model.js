const db = require('../../data/db-config');


function findAll() { 
  return db('users') 
}
function findById (id) {
  return db('users').where('id', id)
}
async function findByFilter (filter) { 
  return await db('users').where(filter);
}

async function create(user) {
  const [newUser] = await db('users')
    .insert(user, ['user_id', 'username', 'phone_number']);
  return newUser;
}
async function update(user_id, updates){
  const [updatedUser] = await db('users')
    .update(updates, ['user_id', 'phone_number'])
    .where('user_id', user_id);
  return updatedUser;
}

module.exports = {
  findAll,
  findById,
  findByFilter,
  create,
  update,
};

// DO WE NEED ASYNC AWAIT ON THESE TWO FUNCTIONS <<<<<<<<<<<<<<<<< ???

// WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
// AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
// UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
// e.g., .insert(user, ['user_id', 'username', 'password', 'phone_number']) 
// { user_id: 7, username: 'foo', password: 'xxxxxxx' }