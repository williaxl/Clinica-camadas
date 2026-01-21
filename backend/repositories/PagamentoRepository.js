const { query, queryOne } = require('../config/sqlite-helper');

class PagamentoRepository {
  async criar(consultaId, valor, dataPagamento, statusPagamento = 'pendente', metodoPagamento) {
    const sql = `
      INSERT INTO pagamentos (consulta_id, valor, data_pagamento, status_pagamento, metodo_pagamento)
      VALUES (?, ?, ?, ?, ?)
    `;
    const result = await query(sql, [consultaId, valor, dataPagamento, statusPagamento, metodoPagamento]);
    if (result.lastID) {
      return { id: result.lastID, consulta_id: consultaId, valor, data_pagamento: dataPagamento, status_pagamento: statusPagamento, metodo_pagamento: metodoPagamento };
    }
    return null;
  }

  async buscarPorId(id) {
    const sql = 'SELECT * FROM pagamentos WHERE id = ?';
    return await queryOne(sql, [id]);
  }

  async buscarPorConsultaId(consultaId) {
    const sql = 'SELECT * FROM pagamentos WHERE consulta_id = ?';
    return await queryOne(sql, [consultaId]);
  }

  async listarTodos() {
    const sql = `
      SELECT p.*, c.data_consulta, pac.nome as paciente_nome
      FROM pagamentos p
      JOIN consultas c ON p.consulta_id = c.id
      JOIN pacientes pac ON c.paciente_id = pac.id
      ORDER BY p.data_pagamento DESC
    `;
    const result = await query(sql);
    return result.rows;
  }

  async listarPorMes(mes, ano) {
    const sql = `
      SELECT p.*, c.data_consulta, pac.nome as paciente_nome
      FROM pagamentos p
      JOIN consultas c ON p.consulta_id = c.id
      JOIN pacientes pac ON c.paciente_id = pac.id
      WHERE CAST(strftime('%m', p.data_pagamento) AS INTEGER) = ? AND CAST(strftime('%Y', p.data_pagamento) AS INTEGER) = ?
      ORDER BY p.data_pagamento DESC
    `;
    const result = await query(sql, [mes, ano]);
    return result.rows;
  }

  async atualizar(id, valor, dataPagamento, statusPagamento, metodoPagamento) {
    const sql = `
      UPDATE pagamentos 
      SET valor = ?, data_pagamento = ?, status_pagamento = ?, metodo_pagamento = ?, atualizado_em = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    await query(sql, [valor, dataPagamento, statusPagamento, metodoPagamento, id]);
    return { id, valor, data_pagamento: dataPagamento, status_pagamento: statusPagamento, metodo_pagamento: metodoPagamento };
  }

  async deletar(id) {
    const sql = 'DELETE FROM pagamentos WHERE id = ?';
    await query(sql, [id]);
  }
}

module.exports = new PagamentoRepository();
