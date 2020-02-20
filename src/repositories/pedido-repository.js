'use strict';

const mongoose = require('mongoose');
const Pedido = mongoose.model('Pedido');

exports.get = async () => {
    const res = await Pedido.find({}, 'cliente dataCadastro dataAtualizacao produtos');
    return res;
}

exports.create = async (data) => {
    const pedido = new Pedido(data);
    return await pedido.save();
}

exports.update = async (id, data) => {
    const date = new Date();
    await Pedido.findByIdAndUpdate(id, {
        $set: {
            cliente: data.cliente,            
            dataAtualizacao: date,
            produtos: data.produtos
        }
    });
}

exports.delete = async (id) => {
    await Pedido.findByIdAndRemove(id);
}