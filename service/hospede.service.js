const {createHospede, buscarHospedeEmail, buscarHospedes, atualizarHospedes, buscarHospedeId } = require('../repository/hospede.repository');

const validationHospede = (data) => {
  if (!data?.nome) {
    return {
      statusCode: 400,
      message: 'Nome obrigatório',
      validation: false
    }
  }

  if (!data?.endereco) {
    return {
      statusCode: 400,
      message: 'Endereco obrigatório',
      validation: false
    }
  }

  if (!data?.email) {
    return {
      statusCode: 400,
      message: 'Email obrigatório',
      validation: false
    }
  }

  if (!data?.telefone) {
    return {
      statusCode: 400,
      message: 'Telefone obrigatório',
      validation: false
    }
  }

  return {
    validation: true
  }
}

const createHospedeService = async (data) => {
  const validate = validationHospede(data);
  if (!validate.validation) return validate;
  const emailExistente = await buscarHospedeEmail(data.email);
  if (emailExistente?.length) return { validation: false, statusCode: 400, message: 'Email já existente' }
  try {
    const result = await createHospede(data);
    return {
      validation: validate.validation,
      data: result.rows
    }
  } catch (error) {
    throw error;
  }
}

const listHospedeService = async () => {
  try {
    const listaDeHospedes = await buscarHospedes();
    return listaDeHospedes;
  } catch (error) {
    throw error;
  }
}

const atualizarHospedesService = async (data) => {
  const hospedeCadastrado = await buscarHospedeId(data.id);
  if (!hospedeCadastrado.length) return { validation: false, message: 'Hóspede não existe!', statusCode: 400 };
  const validate = validationHospede(data);
  if (!validate.validation) return validate;
  try {
    const result = await atualizarHospedes(data);
    return {
      validation: validate.validation,
      data: result
    }
  } catch (error) {
    throw error;
  }
}

const listaHospedeIdService = async (id) => {
  return await buscarHospedeId(id);
}

module.exports = {
  createHospedeService,
  listHospedeService,
  atualizarHospedesService,
  listaHospedeIdService
}