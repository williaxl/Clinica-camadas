const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

// Caminho do banco de dados
const dbPath = path.join(__dirname, '..', 'clinica.db');

// Criar/conectar ao banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao SQLite:', err.message);
  } else {
    console.log('✅ Conectado ao SQLite em:', dbPath);
  }
});

// Habilitar foreign keys
db.run('PRAGMA foreign_keys = ON');

module.exports = db;
