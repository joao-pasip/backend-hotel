const { createReservaHospedeService, listReservaHospedeService, listaReservaHospedeIdService, atualizarReservaHospedesService } = require('../service/reserva.service');

const createReservaHospedeController = async (req, res) => {
  try {
    const result = await createReservaHospedeService(req.body);
    if (!result?.validation) {
      return res.status(result.statusCode).send({ message: result.message });
    }
    return res.status(201).send({ message: 'Reserva criada com sucesso! '});
  } catch (error) {
    res.status(400).send({ message: 'Erro interno'});
  }
}

const listReservaHospedeController = async (_req, res) => {
  try {
    const listReservas = await listReservaHospedeService();
    return res.status(200).send(listReservas);
  } catch (error) {
    res.status(400).send({ message: 'Erro interno'});
  }
}

const listaReservaHospedeIdController = async (req, res) => {
   try {
    const { id } = req.params;
    const result = await listaReservaHospedeIdService(id);
    return res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ message: 'Erro interno'});
  }
}

const updateReservaHospedeController = async (req, res) => {
  try {
    const { id } = req.params;
    const obj = {
      id,
      ...req.body
    }
    await atualizarReservaHospedesService(obj);
    
    return res.status(200).send({ message: 'Reserva atualizado com sucesso! '});
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Erro interno'});
  }
}

module.exports = {
  createReservaHospedeController,
  listReservaHospedeController,
  listaReservaHospedeIdController,
  updateReservaHospedeController
}