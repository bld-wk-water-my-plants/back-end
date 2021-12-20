require('dotenv').config()

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'maple',
  BCRYPTJS_ROUNDS: 8,
}
  