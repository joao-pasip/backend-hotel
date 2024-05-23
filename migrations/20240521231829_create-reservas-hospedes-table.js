exports.up = async function(knex) {
  const exists = await knex.schema.hasTable('reservas_hospedes');
  if (!exists) {
    return await knex.schema.createTable('reservas_hospedes', function(table) {
      table.increments('id').primary();
      table.integer('hospede_id').unsigned().notNullable();
      table.integer('reserva_id').unsigned().notNullable();
      table.foreign('hospede_id').references('id').inTable('hospedes').onDelete('CASCADE');
      table.foreign('reserva_id').references('id').inTable('reservas').onDelete('CASCADE');
      table.timestamps(true, true);
    });
  }
};

exports.down = function(knex) {
  return knex.schema.dropTable('reserva_hospedes');
};
