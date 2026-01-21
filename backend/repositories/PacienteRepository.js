const { query, queryOne } = require('../config/sqlite-helper');

class PacienteRepository {
  async criar(nome, cpf, dataNascimento, telefone, endereco, email) {
    const sql = `
      INSERT INTO pacientes (nome, cpf, data_nascimento, telefone, endereco, email)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const result = await query(sql, [nome, cpf, dataNascimento, telefone, endereco, email]);
    if (result.lastID) {
      return { id: result.lastID, nome, cpf, data_nascimento: dataNascimento, telefone, endereco, email };
    }
    return null;
  }

  async buscarPorId(id) {
    const sql = 'SELECT * FROM pacientes WHERE id = ?';
    return await queryOne(sql, [id]);
  }

  async listarTodos() {
    const sql = 'SELECT * FROM pacientes ORDER BY nome';
    const result = await query(sql);
    return result.rows;
  }

  async buscarPorCPF(cpf) {
    const sql = 'SELECT * FROM pacientes WHERE cpf = ?';
    return await queryOne(sql, [cpf]);
  }

  async atualizar(id, nome, cpf, dataNascimento, telefone, endereco, email) {
    const sql = `
      UPDATE pacientes 
      SET nome = ?, cpf = ?, data_nascimento = ?, telefone = ?, endereco = ?, email = ?, atualizado_em = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    await query(sql, [nome, cpf, dataNascimento, telefone, endereco, email, id]);
    return { id, nome, cpf, data_nascimento: dataNascimento, telefone, endereco, email };
  }

  async deletar(id) {
    const sql = 'DELETE FROM pacientes WHERE id = ?';
    await query(sql, [id]);
  }
}

module.exports = new PacienteRepository();
