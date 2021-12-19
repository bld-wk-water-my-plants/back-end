// 4.4 BUILD WEEK - WATER MY PLANTS

require('dotenv').config()

const server = require('./api/server')

const PORT = process.env.PORT || 3300

server.listen(PORT, () => {
  console.log(`\n### listening on Port ${PORT} ###`)
})
