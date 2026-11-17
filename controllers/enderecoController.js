const Endereco = require('../models/enderecoModel');

const enderecoController = {
    listar: async (req, res) => {
        try {
            const { pessoa_id } = req.params;
            const enderecos = await Endereco.listarPorPessoa(pessoa_id);
            res.json(enderecos);
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    },
    buscarPorId: async (req, res) => {
        try {
            const { pessoa_id, id } = req.params;
            const endereco = await Endereco.buscarPorId(id, pessoa_id);
            if (!endereco) {
                return res.status(404).json({ erro: "Endereço não encontrado para esta pessoa." });
            }
            res.json(endereco);
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    },
    criar: async (req, res) => {
        try {
            const { pessoa_id } = req.params;
            const { cep, logradouro, numero, complemento, bairro, cidade, estado } = req.body;
            const novoEndereco = await Endereco.criar(pessoa_id, cep, logradouro, numero, complemento, bairro, cidade, estado);
            res.status(201).json(novoEndereco);
        } catch (erro) {
            if (erro.message.includes("FOREIGN KEY")) {
                return res.status(400).json({ erro: "Pessoa informada não existe." });
            }
            res.status(500).json({ erro: erro.message });
        }
    },
    atualizar: async (req, res) => {
        try {
            const { pessoa_id, id } = req.params;
            const { cep, logradouro, numero, complemento, bairro, cidade, estado } = req.body;
            const linhasAfetadas = await Endereco.atualizar(id, pessoa_id, cep, logradouro, numero, complemento, bairro, cidade, estado);
            if (linhasAfetadas === 0) {
                return res.status(404).json({ erro: "Endereço não encontrado para esta pessoa." });
            }
            res.json({ id: Number(id), pessoa_id: Number(pessoa_id), cep, logradouro, numero, complemento, bairro, cidade, estado });
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    },
    deletar: async (req, res) => {
        try {
            const { pessoa_id, id } = req.params;
            const linhasAfetadas = await Endereco.deletar(id, pessoa_id);
            if (linhasAfetadas === 0) {
                return res.status(404).json({ erro: "Endereço não encontrado para esta pessoa." });
            }
            res.json({ mensagem: "Endereço removido com sucesso." });
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    }
};

module.exports = enderecoController;