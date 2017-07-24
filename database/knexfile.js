require('dotenv').config({path: __dirname + '/../.env'})
const config = readConfig(process.env.NODE_ENV)

module.exports = {
    client: 'pg',
    connection: process.env.DB || config.db,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds'
    }
}
