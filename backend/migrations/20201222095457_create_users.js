//ela atualiza as modificações feitas no banco
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        //table.increments();//auto incremento...
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.integer('idade');
        table.string('empresa');
    });
};


//se der alguma coisa errada, serve pra desfazer modificações que deram errado.
exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
