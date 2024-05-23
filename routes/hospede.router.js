const express = require('express');
const { createHospedeController, listHospedeController, updateHospeteController, listaHospedeIdController } = require('../controller/hospede.controller');

const router = express.Router();

router.post('/', createHospedeController);

router.get('/', listHospedeController);

router.get('/:id', listaHospedeIdController);

router.patch('/:id', updateHospeteController);

module.exports = router;