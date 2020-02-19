'use strict';

const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');

exports.getAll = async () => {
    const res = await Produto.find({}, 'descricao preco dataCadastro dataAtualizacao');
    return res;
}

exports.getByDescricao = async (descricao) => {
    const res = await Produto.findOne({
        descricao: descricao
    }, 'descricao preco dataCadastro dataAtualizacao');
    return res;
}

exports.create = async (data) => {
    const produto = new Produto(data);
    await produto.save();
}

exports.update = async (id, descricao) => {
    const data = new Date();
    await Produto.findByIdAndUpdate(id, {
        $set: {
            descricao: descricao,
            dataAtualizacao: data
        }
    });
}

exports.delete = async (id) => {
    await Produto.findByIdAndRemove(id);
}