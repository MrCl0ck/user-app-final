
exports.up = function(knex) {
    return knex.schema.createTable('conta', function (table){
        table.string('id').primary();
        table.string('user').notNullable();
        table.foreign('user').references('users.id');
        table.string('nome_user').notNullable();
        table.string('agencia').notNullable();
        table.string('banco').notNullable();
        table.double('saldo').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('conta');
};
