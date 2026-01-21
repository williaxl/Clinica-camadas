const { query, queryOne } = require('../config/sqlite-helper');

class ConsultaRepository {
  async criar(pacienteId, dentistaId, dataConsulta, horaConsulta, status = 'agendada', observacoes = '') {
    const sql = `
      INSERT INTO consultas (paciente_id, dentista_id, data_consulta, hora_consulta, status, observacoes)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const result = await query(sql, [pacienteId, dentistaId, dataConsulta, horaConsulta, status, observacoes]);
    if (result.lastID) {
      return { id: result.lastID, paciente_id: pacienteId, dentista_id: dentistaId, data_consulta: dataConsulta, hora_consulta: horaConsulta, status, observacoes };
    }
    return null;
  }

  async buscarPorId(id) {
    const sql = `
      SELECT c.*, p.nome as paciente_nome, d.id as dentista_id
      FROM consultas c
      JOIN pacientes p ON c.paciente_id = p.id
      JOIN dentistas d ON c.dentista_id = d.id
      WHERE c.id = ?
    `;
    return await queryOne(sql, [id]);
  }

  async listarPorData(data) {
    const sql = `
      SELECT c.*, p.nome as paciente_nome
      FROM consultas c
      JOIN pacientes p ON c.paciente_id = p.id
      WHERE DATE(c.data_consulta) = ?
      ORDER BY c.hora_consulta
    `;
    const result = await query(sql, [data]);
    return result.rows;
  }

  async listarPorPaciente(pacienteId) {
    const sql = `
      SELECT c.*, p.nome as paciente_nome
      FROM consultas c
      JOIN pacientes p ON c.paciente_id = p.id
      WHERE c.paciente_id = ?
      ORDER BY c.data_consulta DESC
    `;
    const result = await query(sql, [pacienteId]);
    return result.rows;
  }

  async listarTodas() {
    const sql = `
      SELECT c.*, p.nome as paciente_nome
      FROM consultas c
      JOIN pacientes p ON c.paciente_id = p.id
      ORDER BY c.data_consulta DESC
    `;
    const result = await query(sql);
    return result.rows;
  }

  async atualizar(id, dataConsulta, horaConsulta, status, observacoes) {
    const sql = `
      UPDATE consultas 
      SET data_consulta = ?, hora_consulta = ?, status = ?, observacoes = ?, atualizado_em = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    await query(sql, [dataConsulta, horaConsulta, status, observacoes, id]);
    return { id, data_consulta: dataConsulta, hora_consulta: horaConsulta, status, observacoes };
  }

  async deletar(id) {
    const sql = 'DELETE FROM consultas WHERE id = ?';
    await query(sql, [id]);
  }
}

module.exports = new ConsultaRepository();
