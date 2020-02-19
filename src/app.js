'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

//Banco
mongoose.connect(config.connectionString);

//Models
const Cliente = require('./models/cliente');
const Pedido = require('./models/pedido');
const Produto = require('./models/produto');

//Rotas
const indexRoute = require('./routes/index-route');
const clienteRoute = require('./routes/cliente-route');
const pedidoRoute = require('./routes/pedido-route');
const produtoRoute = require('./routes/produto-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/clientes', clienteRoute);
app.use('/pedidos', pedidoRoute);
app.use('/produtos', produtoRoute);

module.exports = app;