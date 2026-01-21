const express = require('express');
const PacienteController = require('../controllers/PacienteController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Todas as rotas são protegidas
router.use(authMiddleware);

router.post('/', (req, res) => PacienteController.criar(req, res));
router.get('/', (req, res) => PacienteController.listarTodos(req, res));
router.get('/cpf', (req, res) => PacienteController.buscarPorCPF(req, res));
router.get('/:id', (req, res) => PacienteController.buscarPorId(req, res));
router.put('/:id', (req, res) => PacienteController.atualizar(req, res));
router.delete('/:id', (req, res) => PacienteController.deletar(req, res));

module.exports = router;
