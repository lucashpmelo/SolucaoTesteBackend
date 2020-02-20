'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//O Model Cliente com os atributos: nome, dataNascimento, dataCadastro e dataAtualizacao.

const schema = new Schema({
    nome: {
        type: String,
        required: true
    },
    dataNascimento: {
        type: Date,
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

module.exports = mongoose.model('Cliente', schema);