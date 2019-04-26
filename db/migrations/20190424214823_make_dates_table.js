
exports.up = function(knex, Promise) {
    return knex.schema.createTable('dates', function (table) {
        table.increments();
        table.date('day');
        table.time('from_time');
        table.time('to_time');
        table.integer('event_id');
        table.foreign('event_id').references('events.id');
    });    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('dates');
};
