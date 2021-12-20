const bcryptjs = require('bcryptjs');
const { BCRYPTJS_ROUNDS } = require('../../api/auth/secret');

const password = '1234';
const hashed = bcryptjs.hashSync(password, BCRYPTJS_ROUNDS)

exports.seed = async function (knex) {
    await knex('users').insert([
        {username:'Alpha', password: hashed, phone_number:'111-111-1111'},
        {username:'Beta', password: hashed, phone_number:'222-222-2222'},
        {username:'Gamma', password: hashed, phone_number:'333-333-3333'},
        {username:'Delta', password: hashed, phone_number:'444-444-4444'}
    ])
}