exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', (table) => {
    table.increments(),
    table.integer('user_id'),
    table.integer('cities_id'),
    table.text('title'),
    table.text('content'),
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts')
};
