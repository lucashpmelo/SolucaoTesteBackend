'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//O Model Produto com os atributos: descricao, preco, dataCadastro e dataAtualizacao.

const schema = new Schema({
    descricao: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    dataCadastro: {
        type: Date,
        required: true,
        default: Date.now
    },
    dataAtualizacao: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Produto', schema);