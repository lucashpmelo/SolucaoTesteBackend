'use strict';

const ValidationContract = require('../validators/fluent-validador');
const repository = require('../repositories/cliente-repository');

exports.getAll = async (req, res, next) => {
    try {
        const data = await repository.getAll();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getByName = async (req, res, next) => {
    try {
        const data = await repository.getByName(req.body.nome);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.nome, 1, 'Nome Cliente é obrigatório');

    if (!contract.isValid()) {
        res.status(400).send({message: 'Nome Cliente é obrigatório'});
        return;
    }

    try {
        const data = await repository.create(req.body);        

        res.status(201).send({            
            nome: data.nome,
            dataNascimento: data.dataNascimento,
            dataCadastro: data.dataCadastro,
            _id: data._id
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.put = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body._id, 0, 'Id não foi informado para alteracção');

    if (!contract.isValid()) {
        res.status(401).send({message: 'Id não foi informado'});
        return;
    }

    try {
        const data = await repository.update(req.body._id, req.body.nome);
        res.status(200).send({
            nome: data.nome,
            dataAtualizacao: data.dataAtualizacao
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            message: 'Cliente removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};