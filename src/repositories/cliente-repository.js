'use strict';

const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

exports.getAll = async () => {
    const res = await Cliente.find({}, 'nome dataNascimento dataCadastro dataAtualizacao');
    return res;
}

exports.getByName = async (nome) => {
    const res = await Cliente.findOne({
        nome: nome
    }, 'nome dataNascimento dataCadastro dataAtualizacao');
    return res;
}

exports.create = async (data) => {
    const cliente = new Cliente(data);
    return await cliente.save();
}

exports.update = async (id, nome) => {
    const data = new Date();
    await Cliente.findByIdAndUpdate(id, {
        $set: {
            nome: nome,
            dataAtualizacao: data
        }
    });
    
    const res = await Cliente.findOne({
        nome: nome
    }, 'nome dataNascimento dataCadastro dataAtualizacao');
    return res;
}

exports.delete = async (id) => {
    await Cliente.findByIdAndRemove(id);
}