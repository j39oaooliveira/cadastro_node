const db = require("../database/database");

const Endereco = {
    listarPorPessoa: (pessoa_id) => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM enderecos WHERE pessoa_id = ?", [pessoa_id], (erro, enderecos) => {
                if (erro) reject(erro);
                else resolve(enderecos);
            });
        });
    },
    buscarPorId: (id, pessoa_id) => {
        return new Promise((resolve, reject) => {
            db.get(
                "SELECT * FROM enderecos WHERE id = ? AND pessoa_id = ?",
                [id, pessoa_id],
                (erro, endereco) => {
                    if (erro) reject(erro);
                    else resolve(endereco);
                }
            );
        });
    },
    criar: (pessoa_id, cep, logradouro, numero, complemento, bairro, cidade, estado) => {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO enderecos (pessoa_id, cep, logradouro, numero, complemento, bairro, cidade, estado) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [pessoa_id, cep, logradouro, numero, complemento, bairro, cidade, estado],
                function (erro) {
                    if (erro) reject(erro);
                    else resolve({ id: this.lastID, pessoa_id, cep, logradouro, numero, complemento, bairro, cidade, estado });
                }
            );
        });
    },
    atualizar: (id, pessoa_id, cep, logradouro, numero, complemento, bairro, cidade, estado) => {
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE enderecos 
                 SET cep = ?, logradouro = ?, numero = ?, complemento = ?, bairro = ?, cidade = ?, estado = ? 
                 WHERE id = ? AND pessoa_id = ?`,
                [cep, logradouro, numero, complemento, bairro, cidade, estado, id, pessoa_id],
                function (erro) {
                    if (erro) reject(erro);
                    else resolve(this.changes);
                }
            );
        });
    },
    deletar: (id, pessoa_id) => {
        return new Promise((resolve, reject) => {
            db.run(
                "DELETE FROM enderecos WHERE id = ? AND pessoa_id = ?",
                [id, pessoa_id],
                function (erro) {
                    if (erro) reject(erro);
                    else resolve(this.changes);
                }
            );
        });
    }
};

module.exports = Endereco;