const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/banco.db', (erro) => {
    if (erro) {
        console.error("Erro ao conectar ao banco:", erro.message);
    } else {
        console.log("Conectado ao banco de dados SQLite.");

        // Ativa a validação de chave estrangeira no SQLite
        db.run("PRAGMA foreign_keys = ON;");
        
        db.run(`CREATE TABLE IF NOT EXISTS pessoas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            data_nascimento TEXT,
            sexo TEXT,
            documento TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS enderecos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pessoa_id INTEGER,
            cep TEXT,
            logradouro TEXT,
            numero TEXT,
            complemento TEXT,
            bairro TEXT,
            cidade TEXT,
            estado TEXT,
            FOREIGN KEY (pessoa_id) REFERENCES pessoas(id)
        )`);
    }
});

module.exports = db;