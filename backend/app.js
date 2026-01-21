const express = require('express');
const cors = require('cors');
require('dotenv').config();

const usuariosRoutes = require('./routes/usuariosRoutes');
const pacientesRoutes = require('./routes/pacientesRoutes');
const consultasRoutes = require('./routes/consultasRoutes');
const prontuariosRoutes = require('./routes/prontuariosRoutes');
const pagamentosRoutes = require('./routes/pagamentosRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/pacientes', pacientesRoutes);
app.use('/api/consultas', consultasRoutes);
app.use('/api/prontuarios', prontuariosRoutes);
app.use('/api/pagamentos', pagamentosRoutes);

// Rota de saúde
app.get('/api/saude', (req, res) => {
  res.json({ status: 'Servidor funcionando corretamente' });
});

// Tratamento de erros 404
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log('API disponível em http://localhost:' + PORT);
});

module.exports = app;
