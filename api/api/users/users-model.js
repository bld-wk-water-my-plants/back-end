const db = require('../../data/db-config');


function findAll() { 
  return db('users') 
}
function findById (id) {
  return db('users').where('id', id)
}
function findByFilter (filter) {
  return db('users').where({filter});
}

// DO WE NEED ASYNC AWAIT ON THESE TWO FUNCTIONS <<<<<<<<<<<<<<<<<
function createUser(user) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
  const [newUser] =  db('users').insert(user, ['user_id', 'username', 'password', 'phone_number'])
  return newUser // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
}
function updateUser(id, user){
  const [updatedUser] =  db('users')
    .update(user, ['user_id', 'username', 'password', 'phone_number'])
    .where('user_id', id)
  return updatedUser // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
}

module.exports = {
  findAll,
  findById,
  findByFilter,
  createUser,
  updateUser,
};