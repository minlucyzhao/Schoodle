exports.up = function(knex, Promise) {
    return knex.schema.createTable('events', function (table) {
      table.increments();
      table.string('title');
      table.string('description');
      table.string('url');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('events');
  };
  