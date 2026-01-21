const db = require('./database');

// Helper para executar queries SQLite
const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    if (sql.toUpperCase().includes('INSERT') || sql.toUpperCase().includes('UPDATE') || sql.toUpperCase().includes('DELETE')) {
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({
          lastID: this.lastID,
          changes: this.changes,
          rows: []
        });
      });
    } else {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve({ rows: rows || [] });
      });
    }
  });
};

// Helper para obter um único resultado
const queryOne = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row || null);
    });
  });
};

module.exports = { query, queryOne };
