const db = require('../database/db');

const createReserva = async({numero_reserva, data_checkin, data_checkout, status, hospedes}) => {
  try {
    return await db.transaction(async trx => {
      const [reservaId] = await trx('reservas').insert({numero_reserva, data_checkin, data_checkout, status}).returning('id');

      const reservaHospedes = hospedes.map(hospedeId => ({
        reserva_id: reservaId.id,
        hospede_id: hospedeId
      }));

      return await trx('reservas_hospedes').insert(reservaHospedes);
    });
  } catch (error) {
    throw new Error('Erro ao criar reserva!');
  }
}

const buscarReservaId = async (id) => {
  try {
    const result = await db.raw('SELECT * from reservas WHERE numero_reserva = ?', [id]);
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao buscar hóspede!')
  }
}

const buscarReservas = async () => {
  try {
    const result = await db.raw(
      `SELECT
      r.id AS reserva_id,
      r.numero_reserva,
      to_char(r.data_checkin, 'DD-MM-YYYY') data_checkin,
      to_char(r.data_checkout, 'DD-MM-YYYY') data_checkout,
      r.status,
      json_agg(
        json_build_object(
          'hospede_id', h.id,
          'nome', h.nome,
          'email', h.email,
          'telefone', h.telefone,
          'endereco', h.endereco
        )
      ) AS hospedes
      FROM
        reservas r
      JOIN
        reservas_hospedes rh ON r.id = rh.reserva_id
      JOIN
        hospedes h ON rh.hospede_id = h.id
      GROUP BY
        r.id
      ORDER BY
        r.id DESC;  
      `
    );
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao listar hóspedes!')
  }
}

const buscarReservasHospedesId = async (reserva_id) => {
  try {
    const result = await db.raw(
      `SELECT
      r.id AS reserva_id,
      r.numero_reserva,
      r.data_checkin,
      r.data_checkout,
      r.status,
      json_agg(
        json_build_object(
          'hospede_id', h.id,
          'nome', h.nome,
          'email', h.email,
          'telefone', h.telefone,
          'endereco', h.endereco
        )
      ) AS hospedes
      FROM
        reservas r
      JOIN
        reservas_hospedes rh ON r.id = rh.reserva_id
      JOIN
        hospedes h ON rh.hospede_id = h.id
      WHERE
        r.id = ?
      GROUP BY
        r.id;
      `, [reserva_id]
    );
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao listar reservas!')
  }
}

const atualizarReservaHospede = async ({data_checkin, data_checkout, status, id}) => {
  try {
    return await db.raw(`UPDATE reservas SET ${data_checkin ? 'data_checkin = ?' : ''}, ${data_checkout ? 'data_checkout = ?' : ''}, ${status ? 'status = ?' : ''} WHERE id = ?`,  [data_checkin, data_checkout, status, id])
  } catch (error) {
    throw new Error('Erro ao atualizar reservas!')
  }
}

module.exports = {
  createReserva,
  buscarReservaId,
  buscarReservas,
  buscarReservasHospedesId,
  atualizarReservaHospede
}