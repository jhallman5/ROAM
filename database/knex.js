require('dotenv').config({path: __dirname + '/../.env'})

const config = require('./knexfile.js')

module.exports = require('knex')(config)
