const express = require('express');
const router = express.Router({ mergeParams: true });
const enderecoController = require('../controllers/enderecoController');

router.get('/', enderecoController.listar);
router.get('/:id', enderecoController.buscarPorId);
router.post('/', enderecoController.criar);
router.put('/:id', enderecoController.atualizar);
router.delete('/:id', enderecoController.deletar);

module.exports = router;