// ----- IMPORTS -----
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const db = require('./data/db-config')

// Import routers & middleware
const { restricted } = require('./api/auth/auth-middleware');
const authRouter = require('./api/auth/auth-router');
const plantRouter = require('./api/plants/plants-router');


// ----- SERVER & ROUTERS -----
const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/auth', authRouter);
server.use('/api/plants', restricted, plantRouter); 

server.get('/', (req, res) => {
  res.send('<h1>Hooray! You found us!</h1>')
})

server.use((err, req, res, next) => { 
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});



module.exports = server;
