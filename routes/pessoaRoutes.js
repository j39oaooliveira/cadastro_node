const express = require('express');
const router = express.Router();
const pessoaController = require('../controllers/pessoaController');

router.get('/', pessoaController.listar);
router.get('/:id', pessoaController.buscarPorId);
router.post('/', pessoaController.criar);
router.put('/:id', pessoaController.atualizar);
router.delete('/:id', pessoaController.deletar);

module.exports = router;