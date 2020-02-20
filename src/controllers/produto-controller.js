'use strict';

const ValidationContract = require('../validators/fluent-validador');
const repository = require('../repositories/produto-repository');

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

exports.getByDescricao = async (req, res, next) => {
    try {
        const { descricao } = await repository.getByDescricao(req.query.descricao);

        const retorno = { descricao }

        res.status(200).send(retorno);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.descricao, 1, 'Descrição Produto é obrigatório');

    if (!contract.isValid()) {
        res.status(400).send({ message: 'Descrição Produto é obrigatório' });
        return;
    }

    try {
        const { _id, descricao, preco, dataCadastro } = await repository.create(req.body);

        const retorno = {
            _id,
            descricao,
            preco,
            dataCadastro
        }

        res.status(201).send({ retorno });
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
        res.status(401).send({ message: 'Id não foi informado' });
        return;
    }

    try {
        const { descricao, dataAtualizacao } = await repository.update(req.body._id, req.body.descricao);

        const retorno = {
            descricao,
            dataAtualizacao
        }

        res.status(200).send({ retorno });
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
            message: 'Produto removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};