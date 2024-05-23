const { createHospedeService, listHospedeService, atualizarHospedesService, listaHospedeIdService } = require('../service/hospede.service');

const createHospedeController = async (req, res) => {
  try {
    const result = await createHospedeService(req.body);
    if (!result?.validation) {
      return res.status(result.statusCode).send({ message: result.message });
    }
    return res.status(201).send({ message: 'Hóspede criado com sucesso! '});
  } catch (error) {
    res.status(400).send({ message: 'Erro interno'});
  }
}

const listHospedeController = async (_req, res) => {
  try {
    const listHospede = await listHospedeService();
    return res.status(200).send(listHospede);
  } catch (error) {
    res.status(400).send({ message: 'Erro interno'});
  }
}

const updateHospeteController = async (req, res) => {
  try {
    const { id } = req.params;
    const obj = {
      id,
      ...req.body
    }
    const result = await atualizarHospedesService(obj);
    if (!result?.validation) {
      return res.status(result.statusCode).send({ message: result.message });
    }
    return res.status(200).send({ message: 'Hóspede atualizado com sucesso! '});
  } catch (error) {
    res.status(400).send({ message: 'Erro interno'});
  }
}

const listaHospedeIdController = async (req, res) => {
   try {
    const { id } = req.params;
    const result = await listaHospedeIdService(id);
    return res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ message: 'Erro interno'});
  }
}

module.exports = {
  createHospedeController,
  listHospedeController,
  updateHospeteController,
  listaHospedeIdController
}