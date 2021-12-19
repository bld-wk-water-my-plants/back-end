
exports.seed = async function (knex) {
    await knex('plants').insert([
        {plant_nickname: 'Coral Bark Maple', user_id: '1', species_id:'1' },
        {plant_nickname: 'Hydrangea', user_id: '1', species_id:'2' },
        {plant_nickname: 'Rose', user_id: '1', species_id:'3' },
        {plant_nickname: 'Baking Flour', user_id: '1', species_id:'4' },

        {plant_nickname: 'Coral Bark Maple', user_id: '2', species_id:'1' },
        {plant_nickname: 'Hydrangea', user_id: '2', species_id:'2' },
        {plant_nickname: 'Rose', user_id: '2', species_id:'3' },
        {plant_nickname: 'Baking Flour', user_id: '2', species_id:'4' },
        
        {plant_nickname: 'Coral Bark Maple', user_id: '3', species_id:'1' },
        {plant_nickname: 'Hydrangea', user_id: '3', species_id:'2' },
        {plant_nickname: 'Rose', user_id: '3', species_id:'3' },
        {plant_nickname: 'Baking Flour', user_id: '3', species_id:'4' },

        {plant_nickname: 'Coral Bark Maple', user_id: '4', species_id:'1' },
        {plant_nickname: 'Hydrangea', user_id: '4', species_id:'2' },
        {plant_nickname: 'Rose', user_id: '4', species_id:'3' },
        {plant_nickname: 'Baking Flour', user_id: '4', species_id:'4' }
    ])
}
