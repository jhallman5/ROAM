module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://jhallman5@localhost:5432/roam',
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds'
    }
  }
};
