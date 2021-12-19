// Corel Bark Maple
// Hydrangea
// Rose
// Baking flour
exports.seed = async function (knex) {
    await knex('species').insert([
        {species_name:'Acer palmatum', h2o_frequency:1, image:'https://images.unsplash.com/photo-1618172449507-8afee268f7b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80' }
        {species_name:'Hydrangea macrophylla', h2o_frequency:1, image:'https://images.pexels.com/photos/7336208/pexels-photo-7336208.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' }
        {species_name:'Hesperrhodos', h2o_frequency:1, image:'https://images.pexels.com/photos/593655/pexels-photo-593655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
        {species_name:'Cornerfolorus powderdus', h2o_frequency:4, image:'https://images.pexels.com/photos/6605210/pexels-photo-6605210.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }
    ])
}