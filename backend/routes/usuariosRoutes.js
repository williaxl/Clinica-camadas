const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Rotas públicas
router.post('/registrar', (req, res) => UsuarioController.registrar(req, res));
router.post('/autenticar', (req, res) => UsuarioController.autenticar(req, res));

// Rotas protegidas
router.get('/id/:id', authMiddleware, (req, res) => UsuarioController.buscarPorId(req, res));
router.get('/', authMiddleware, (req, res) => UsuarioController.listarTodos(req, res));
router.put('/:id', authMiddleware, (req, res) => UsuarioController.atualizar(req, res));
router.delete('/:id', authMiddleware, (req, res) => UsuarioController.deletar(req, res));

module.exports = router;
