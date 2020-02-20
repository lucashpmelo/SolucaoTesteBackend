'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//O Model Pedido com os atributos: cliente, dataCadastro e dataAtualizacao e produtos[{idProduto, descricao, quantidade, preco}].

const schema = new Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
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
    },
    produtos: [{
        idProduto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Produto'
        },
        descricao: {
            type: String,
            required: true
        },
        quantidade: {
            type: Number,
            required: true,
            default: 1
        },
        preco: {
            type: Number,
            required: true
        }        
    }]
});

module.exports = mongoose.model('Pedido', schema);