exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (table) => {
      table.increments('user_id')
      table.string('username', 200).notNullable().unique()
      table.string('password', 200).notNullable()
      table.string('phone_number', 200).notNullable().unique()
      // users.timestamps(false, true)
    })
    .createTable('species', (table) => {
      table.increments('species_id')
      table.string('species_name', 200).notNullable().unique()
      table.integer('h2o_frequency', 200).notNullable().unsigned()
      table.string('image', 200)
      // species.timestamps(false, true)
    })
    .createTable('plants', (table) => {
      table.increments('plant_id')
      table.string('plant_nickname', 200).notNullable() // <<< Unique ???
      table.string('user_id', 200)
        .notNullable()
        .unsigned()
        .references('user_id')
        .inTable('users')
        .onDelete('RESTRICT')
      table.string('species_id', 200)
        .notNullable()
        .unsigned()
        .references('species_id')
        .inTable('species')
        .onDelete('RESTRICT')
      // plants.timestamps(false, true)
    })
}

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('plants')
    .dropTableIfExists('species')
    .dropTableIfExists('users')
}
