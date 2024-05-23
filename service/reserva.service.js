const { createReserva, buscarReservaId, buscarReservas, buscarReservasHospedesId, atualizarReservaHospede } = require('../repository/reserva.repository');

const validationReserva = (data) => {
  if (!data?.numero_reserva) {
    return {
      statusCode: 400,
      message: 'Número reserva obrigatório',
      validation: false
    }
  }

  if (!data?.data_checkin) {
    return {
      statusCode: 400,
      message: 'Data checkin obrigatório',
      validation: false
    }
  }

  if (!data?.data_checkout) {
    return {
      statusCode: 400,
      message: 'Data checkout obrigatório',
      validation: false
    }
  }

  if (!data?.status) {
    return {
      statusCode: 400,
      message: 'Status obrigatório',
      validation: false
    }
  }

  if (!data?.hospedes) {
    return {
      statusCode: 400,
      message: 'Hospedes obrigatório',
      validation: false
    }
  }

  return {
    validation: true
  }
}

const createReservaHospedeService = async (data) => {
  const validate = validationReserva(data);
  const reservaCadastrada = await buscarReservaId(data.numero_reserva);
  if (reservaCadastrada?.length) return { statusCode: 400, message: 'Reserva já cadastrada!', validation: false };
  if (!validate.validation) return validate;
  try {
    const result = await createReserva(data);
    return {
      validation: validate.validation,
      data: result.rows
    }
  } catch (error) {
    throw error;
  }
}

const listReservaHospedeService = async () => {
  try {
    const listaDeHospedes = await buscarReservas();
    return listaDeHospedes;
  } catch (error) {
    throw error;
  }
}

const listaReservaHospedeIdService = async (reserva_id) => {
  return await buscarReservasHospedesId(reserva_id);
}

const atualizarReservaHospedesService = async (data) => {
  const reservaHospedeCadastrada = await buscarReservasHospedesId(data.id);
  if (!reservaHospedeCadastrada.length) return { validation: false, message: 'Reserva não existe!', statusCode: 400 };
  // const validate = validationReserva(data);
  // if (!validate.validation) return validate;
  try {
    const result = await atualizarReservaHospede(data);
    return {
      data: result
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createReservaHospedeService,
  listReservaHospedeService,
  listaReservaHospedeIdService,
  atualizarReservaHospedesService
}