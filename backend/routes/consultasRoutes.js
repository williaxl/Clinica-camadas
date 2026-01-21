const express = require('express');
const ConsultaController = require('../controllers/ConsultaController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Todas as rotas são protegidas
router.use(authMiddleware);

router.post('/', (req, res) => ConsultaController.criar(req, res));
router.get('/', (req, res) => ConsultaController.listarTodas(req, res));
router.get('/data', (req, res) => ConsultaController.listarPorData(req, res));
router.get('/paciente/:paciente_id', (req, res) => ConsultaController.listarPorPaciente(req, res));
router.get('/:id', (req, res) => ConsultaController.buscarPorId(req, res));
router.put('/:id', (req, res) => ConsultaController.atualizar(req, res));
router.delete('/:id', (req, res) => ConsultaController.deletar(req, res));

module.exports = router;
