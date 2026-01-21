const express = require('express');
const PagamentoController = require('../controllers/PagamentoController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Todas as rotas são protegidas
router.use(authMiddleware);

router.post('/', (req, res) => PagamentoController.criar(req, res));
router.get('/', (req, res) => PagamentoController.listarTodos(req, res));
router.get('/relatorio/mes', (req, res) => PagamentoController.gerarRelatorioMes(req, res));
router.get('/consulta/:consulta_id', (req, res) => PagamentoController.buscarPorConsultaId(req, res));
router.get('/:id', (req, res) => PagamentoController.buscarPorId(req, res));
router.put('/:id', (req, res) => PagamentoController.atualizar(req, res));
router.delete('/:id', (req, res) => PagamentoController.deletar(req, res));

module.exports = router;
