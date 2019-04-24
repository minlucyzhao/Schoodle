
exports.up = function(knex, Promise) {
    return knex.schema.table('users', function(table) {
        table.string('email');
    });
};


exports.down = function(knex, Promise) {
    return knex.schema.table('users', function(table) {
        table.dropColumn('email');
    });
};
