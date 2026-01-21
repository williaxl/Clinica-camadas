const { query, queryOne } = require('../config/sqlite-helper');

class ProntuarioRepository {
  async criar(pacienteId, historicoTratamentos = '', evolucoes = '', alergias = '', observacoes = '') {
    const sql = `
      INSERT INTO prontuarios (paciente_id, historico_tratamentos, evolucoes, alergias, observacoes)
      VALUES (?, ?, ?, ?, ?)
    `;
    const result = await query(sql, [pacienteId, historicoTratamentos, evolucoes, alergias, observacoes]);
    if (result.lastID) {
      return { id: result.lastID, paciente_id: pacienteId, historico_tratamentos: historicoTratamentos, evolucoes, alergias, observacoes };
    }
    return null;
  }

  async buscarPorPacienteId(pacienteId) {
    const sql = 'SELECT * FROM prontuarios WHERE paciente_id = ?';
    return await queryOne(sql, [pacienteId]);
  }

  async buscarPorId(id) {
    const sql = 'SELECT * FROM prontuarios WHERE id = ?';
    return await queryOne(sql, [id]);
  }

  async atualizar(id, historicoTratamentos, evolucoes, alergias, observacoes) {
    const sql = `
      UPDATE prontuarios 
      SET historico_tratamentos = ?, evolucoes = ?, alergias = ?, observacoes = ?, atualizado_em = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    await query(sql, [historicoTratamentos, evolucoes, alergias, observacoes, id]);
    return { id, historico_tratamentos: historicoTratamentos, evolucoes, alergias, observacoes };
  }

  async deletar(id) {
    const sql = 'DELETE FROM prontuarios WHERE id = ?';
    await query(sql, [id]);
  }
}

module.exports = new ProntuarioRepository();
