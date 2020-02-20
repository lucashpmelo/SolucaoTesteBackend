'use strict';

const ValidationContract = require('../validators/fluent-validador');
const repository = require('../repositories/pedido-repository');

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get();

        const retorno = {
            message: 'Sucesso',
            lista: data
        }

        res.status(200).send(retorno);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.cliente, 0, 'Cliente é obrigatório');

    if (!contract.isValid()) {
        res.status(401).send({ message: 'Cliente é obrigatório' });
        return;
    }

    try {
        const { _id, dataCadastro, produtos } = await repository.create(req.body);

        const retorno = {
            _id,
            dataCadastro,
            produtos
        }

        res.status(201).send({ retorno });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.put = async (req, res, next) => {
    try {
        const { dataAtualizacao, cliente } = await repository.update(req.body._id, req.body);

        const retorno = {
            dataAtualizacao,
            cliente
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
            message: 'Pedido removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};