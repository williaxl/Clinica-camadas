const pool = require('../config/database');

class ProntuarioRepository {
  async criar(pacienteId, historicoTratamentos = '', evolucoes = '', alergias = '', observacoes = '') {
    const query = `
      INSERT INTO prontuarios (paciente_id, historico_tratamentos, evolucoes, alergias, observacoes)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await pool.query(query, [pacienteId, historicoTratamentos, evolucoes, alergias, observacoes]);
    return result.rows[0];
  }

  async buscarPorPacienteId(pacienteId) {
    const query = 'SELECT * FROM prontuarios WHERE paciente_id = $1';
    const result = await pool.query(query, [pacienteId]);
    return result.rows[0];
  }

  async buscarPorId(id) {
    const query = 'SELECT * FROM prontuarios WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  async atualizar(id, historicoTratamentos, evolucoes, alergias, observacoes) {
    const query = `
      UPDATE prontuarios 
      SET historico_tratamentos = $2, evolucoes = $3, alergias = $4, observacoes = $5, atualizado_em = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query(query, [id, historicoTratamentos, evolucoes, alergias, observacoes]);
    return result.rows[0];
  }

  async deletar(id) {
    const query = 'DELETE FROM prontuarios WHERE id = $1';
    await pool.query(query, [id]);
  }
}

module.exports = new ProntuarioRepository();
