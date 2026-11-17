const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const pessoaRoutes = require('./routes/pessoaRoutes');
const enderecoRoutes = require('./routes/enderecoRoutes');

app.use('/pessoas', pessoaRoutes);
app.use('/pessoas/:pessoa_id/enderecos', enderecoRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});