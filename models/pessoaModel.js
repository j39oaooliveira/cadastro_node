const db = require("../database/database");

const Pessoa = {
    listar: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM pessoas", [], (erro, pessoas) => {
                if (erro) reject(erro);
                else resolve(pessoas);
            });
        });
    },
    buscarPorId: (id) => {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM pessoas WHERE id = ?", [id], (erro, pessoa) => {
                if (erro) reject(erro);
                else resolve(pessoa);
            });
        }); 
    },
    criar: (nome, data_nascimento, sexo, documento) => {
        return new Promise((resolve, reject) => {
            db.run(
                "INSERT INTO pessoas (nome, data_nascimento, sexo, documento) VALUES (?, ?, ?, ?)",
                [nome, data_nascimento, sexo, documento],
                function (erro) {
                    if (erro) reject(erro);
                    else resolve({ id: this.lastID, nome, data_nascimento, sexo, documento });
                }
            );
        });
    },
    atualizar: (id, nome, data_nascimento, sexo, documento) => {
        return new Promise((resolve, reject) => {
            db.run(
                "UPDATE pessoas SET nome = ?, data_nascimento = ?, sexo = ?, documento = ? WHERE id = ?",
                [nome, data_nascimento, sexo, documento, id],
                function (erro) {
                    if (erro) reject(erro);
                    else resolve(this.changes);
                }
            );
        });
    },
    deletar: (id) => {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM pessoas WHERE id = ?", [id], function (erro) {
                if (erro) reject(erro);
                else resolve(this.changes);
            });
        });
    }
};

module.exports = Pessoa;