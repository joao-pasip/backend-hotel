exports.up = async function(knex) {
  const exists = await knex.schema.hasTable('reservas');
  if (!exists) {
    return await knex.schema.createTable('reservas', function(table) {
      table.increments('id').primary();
      table.integer('numero_reserva').unique().notNullable();
      table.date('data_checkin').notNullable();
      table.date('data_checkout').notNullable();
      table.string('status').notNullable();
      table.timestamps(true, true);
    });
  }
};

exports.down = function(knex) {
  return knex.schema.dropTable('reservas');
};
