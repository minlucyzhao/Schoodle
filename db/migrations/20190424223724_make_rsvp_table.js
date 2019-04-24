
exports.up = function(knex, Promise) {
    return knex.schema.createTable('rsvp', function (table) {
        table.increments();
        table.integer('user_id');
        table.integer('date_id');
        table.integer('event_id');
        table.foreign('user_id').references('users.id');
        table.foreign('date_id').references('dates.id');
        table.foreign('event_id').references('events.id');
    });    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('rsvp');
};
