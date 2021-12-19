// 4.4 BUILD WEEK - WATER MY PLANTS

require('dotenv').config()

const server = require('./api/server')

const port = process.env.PORT

server.listen(port, () => {
  console.log('listening on ' + port)
})
