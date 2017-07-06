require('dotenv').config({path: __dirname + '/../.env'})

module.exports = {
    client: 'pg',
    connection: process.env.DB,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds'
    }
}
