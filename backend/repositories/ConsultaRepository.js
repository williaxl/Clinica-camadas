const pool = require('../config/database');

class ConsultaRepository {
  async criar(pacienteId, dentistaId, dataConsulta, horaConsulta, status = 'agendada', observacoes = '') {
    const query = `
      INSERT INTO consultas (paciente_id, dentista_id, data_consulta, hora_consulta, status, observacoes)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const result = await pool.query(query, [pacienteId, dentistaId, dataConsulta, horaConsulta, status, observacoes]);
    return result.rows[0];
  }

  async buscarPorId(id) {
    const query = `
      SELECT c.*, p.nome as paciente_nome, d.id as dentista_id
      FROM consultas c
      JOIN pacientes p ON c.paciente_id = p.id
      JOIN dentistas d ON c.dentista_id = d.id
      WHERE c.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  async listarPorData(data) {
    const query = `
      SELECT c.*, p.nome as paciente_nome
      FROM consultas c
      JOIN pacientes p ON c.paciente_id = p.id
      WHERE DATE(c.data_consulta) = $1
      ORDER BY c.hora_consulta
    `;
    const result = await pool.query(query, [data]);
    return result.rows;
  }

  async listarPorPaciente(pacienteId) {
    const query = `
      SELECT c.*, p.nome as paciente_nome
      FROM consultas c
      JOIN pacientes p ON c.paciente_id = p.id
      WHERE c.paciente_id = $1
      ORDER BY c.data_consulta DESC
    `;
    const result = await pool.query(query, [pacienteId]);
    return result.rows;
  }

  async listarTodas() {
    const query = `
      SELECT c.*, p.nome as paciente_nome
      FROM consultas c
      JOIN pacientes p ON c.paciente_id = p.id
      ORDER BY c.data_consulta DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  async atualizar(id, dataConsulta, horaConsulta, status, observacoes) {
    const query = `
      UPDATE consultas 
      SET data_consulta = $2, hora_consulta = $3, status = $4, observacoes = $5, atualizado_em = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query(query, [id, dataConsulta, horaConsulta, status, observacoes]);
    return result.rows[0];
  }

  async deletar(id) {
    const query = 'DELETE FROM consultas WHERE id = $1';
    await pool.query(query, [id]);
  }
}

module.exports = new ConsultaRepository();
