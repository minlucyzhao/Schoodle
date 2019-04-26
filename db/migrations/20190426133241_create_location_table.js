
exports.up = function(knex, Promise) {
    return knex.schema.createTable('locations', function (table) {
        table.increments();
        table.string('address');
        table.integer('latitude');
        table.integer('longitude');
        table.integer('user_id');
        table.integer('event_id');
        table.foreign('user_id').references('users.id');
        table.foreign('event_id').references('events.id');
    });    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('locations');
};
