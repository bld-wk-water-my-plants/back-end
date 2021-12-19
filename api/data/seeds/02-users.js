export.seed = async function (knex) {
    await knex('users').insert([
        {username:'Alpha', password:'1234', phone_number:'111-111-1111'},
        {username:'Beta', password:'1234', phone_number:'222-222-2222'},
        {username:'Gamma', password:'1234', phone_number:'333-333-3333'},
        {username:'Delta', password:'1234', phone_number:'444-444-4444'}
    ])
}