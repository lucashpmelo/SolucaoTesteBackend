'use strict'

const express = require('express');

const app = express();

//Rotas
const indexRoute = require('./routes/index-route');
const clienteRoute = require('./routes/cliente-route');
const pedidoRoute = require('./routes/pedido-route');
const produtoRoute = require('./routes/produto-route');

app.use('/', indexRoute);
app.use('/clientes', clienteRoute);
app.use('/pedidos', pedidoRoute);
app.use('/produtos', produtoRoute);

module.exports = app;