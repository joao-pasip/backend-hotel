exports.up = async function(knex) {
  const exists = await knex.schema.hasTable('hospedes');
  if (!exists) {
    return await knex.schema.createTable('hospedes', function(table) {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.string('endereco').notNullable();
      table.string('telefone').notNullable();
      table.string('email').unique().notNullable();
      table.timestamps(true, true);
    });
  }
};

exports.down = function(knex) {
  return knex.schema.dropTable('hospedes');
};
