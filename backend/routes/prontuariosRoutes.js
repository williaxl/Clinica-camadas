const express = require('express');
const ProntuarioController = require('../controllers/ProntuarioController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Todas as rotas são protegidas
router.use(authMiddleware);

router.post('/', (req, res) => ProntuarioController.criar(req, res));
router.get('/paciente/:paciente_id', (req, res) => ProntuarioController.buscarPorPacienteId(req, res));
router.get('/:id', (req, res) => ProntuarioController.buscarPorId(req, res));
router.put('/:id', (req, res) => ProntuarioController.atualizar(req, res));
router.delete('/:id', (req, res) => ProntuarioController.deletar(req, res));

module.exports = router;
