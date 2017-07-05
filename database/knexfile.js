require('dotenv').config({path: '../.env'})

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DB_HOST,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds'
    }
  },
  production: {
    client: 'pg',
    connection: 'postgres://oijfxvrnujrlpv:88da62aec83501baf989351e48d97a04130cfa0719b78ed1e31a6b51b9383a9d@ec2-107-22-250-33.compute-1.amazonaws.com:5432/d6lit602ihdmtl',
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds'
    }
  }
};
