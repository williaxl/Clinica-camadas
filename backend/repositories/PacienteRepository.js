const pool = require('../config/database');

class PacienteRepository {
  async criar(nome, cpf, dataNascimento, telefone, endereco, email) {
    const query = `
      INSERT INTO pacientes (nome, cpf, data_nascimento, telefone, endereco, email)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const result = await pool.query(query, [nome, cpf, dataNascimento, telefone, endereco, email]);
    return result.rows[0];
  }

  async buscarPorId(id) {
    const query = 'SELECT * FROM pacientes WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  async listarTodos() {
    const query = 'SELECT * FROM pacientes ORDER BY nome';
    const result = await pool.query(query);
    return result.rows;
  }

  async buscarPorCPF(cpf) {
    const query = 'SELECT * FROM pacientes WHERE cpf = $1';
    const result = await pool.query(query, [cpf]);
    return result.rows[0];
  }

  async atualizar(id, nome, cpf, dataNascimento, telefone, endereco, email) {
    const query = `
      UPDATE pacientes 
      SET nome = $2, cpf = $3, data_nascimento = $4, telefone = $5, endereco = $6, email = $7, atualizado_em = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query(query, [id, nome, cpf, dataNascimento, telefone, endereco, email]);
    return result.rows[0];
  }

  async deletar(id) {
    const query = 'DELETE FROM pacientes WHERE id = $1';
    await pool.query(query, [id]);
  }
}

module.exports = new PacienteRepository();
