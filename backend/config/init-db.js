const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'clinica.db');

// Criar/conectar ao banco
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Erro ao conectar:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Conectado ao SQLite');
  }
});

// Ler e executar schema
const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

db.exec(schemaSql, (err) => {
  if (err) {
    console.error('❌ Erro ao criar tabelas:', err.message);
  } else {
    console.log('✅ Tabelas criadas com sucesso!');
    console.log(`📁 Banco de dados em: ${dbPath}`);
  }
  db.close();
});
