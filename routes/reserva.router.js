const express = require('express');

const { createReservaHospedeController, listReservaHospedeController, listaReservaHospedeIdController, updateReservaHospedeController } = require('../controller/reserva.controller');

const router = express.Router();

router.post('/', createReservaHospedeController);
router.get('/', listReservaHospedeController);
router.get('/:id', listaReservaHospedeIdController);
router.patch('/:id', updateReservaHospedeController);

module.exports = router;