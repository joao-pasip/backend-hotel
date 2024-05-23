const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routerHospede = require('./hospede.router');
const routerReserva = require('./reserva.router');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('ESTAMOS ON!')
})

app.use('/hospede', routerHospede)
app.use('/reserva', routerReserva)

module.exports = app;