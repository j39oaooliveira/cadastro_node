const Pessoa = require('../models/pessoaModel');

const pessoaController = {
    listar: async (req, res) => {
        try {
            const pessoas = await Pessoa.listar();
            res.json(pessoas);
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    },
    buscarPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const pessoa = await Pessoa.buscarPorId(id);
            if (!pessoa) {
                return res.status(404).json({ erro: "Pessoa não encontrada." });
            }
            res.json(pessoa);
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    },
    criar: async (req, res) => {
        try {
            const { nome, data_nascimento, sexo, documento } = req.body;
            const novaPessoa = await Pessoa.criar(nome, data_nascimento, sexo, documento);
            res.status(201).json(novaPessoa);
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    },
    atualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, data_nascimento, sexo, documento } = req.body;
            const linhasAfetadas = await Pessoa.atualizar(id, nome, data_nascimento, sexo, documento);
            if (linhasAfetadas === 0) {
                return res.status(404).json({ erro: "Pessoa não encontrada." });
            }
            res.json({ id: Number(id), nome, data_nascimento, sexo, documento });
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    },
    deletar: async (req, res) => {
        try {
            const { id } = req.params;
            const linhasAfetadas = await Pessoa.deletar(id);
            if (linhasAfetadas === 0) {
                return res.status(404).json({ erro: "Pessoa não encontrada." });
            }
            res.json({ mensagem: "Pessoa removida com sucesso." });
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    }
};

module.exports = pessoaController;