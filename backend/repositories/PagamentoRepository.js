const pool = require('../config/database');

class PagamentoRepository {
  async criar(consultaId, valor, dataPagamento, statusPagamento = 'pendente', metodoPagamento) {
    const query = `
      INSERT INTO pagamentos (consulta_id, valor, data_pagamento, status_pagamento, metodo_pagamento)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await pool.query(query, [consultaId, valor, dataPagamento, statusPagamento, metodoPagamento]);
    return result.rows[0];
  }

  async buscarPorId(id) {
    const query = 'SELECT * FROM pagamentos WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  async buscarPorConsultaId(consultaId) {
    const query = 'SELECT * FROM pagamentos WHERE consulta_id = $1';
    const result = await pool.query(query, [consultaId]);
    return result.rows[0];
  }

  async listarTodos() {
    const query = `
      SELECT p.*, c.data_consulta, pac.nome as paciente_nome
      FROM pagamentos p
      JOIN consultas c ON p.consulta_id = c.id
      JOIN pacientes pac ON c.paciente_id = pac.id
      ORDER BY p.data_pagamento DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  async listarPorMes(mes, ano) {
    const query = `
      SELECT p.*, c.data_consulta, pac.nome as paciente_nome
      FROM pagamentos p
      JOIN consultas c ON p.consulta_id = c.id
      JOIN pacientes pac ON c.paciente_id = pac.id
      WHERE EXTRACT(MONTH FROM p.data_pagamento) = $1 AND EXTRACT(YEAR FROM p.data_pagamento) = $2
      ORDER BY p.data_pagamento DESC
    `;
    const result = await pool.query(query, [mes, ano]);
    return result.rows;
  }

  async atualizar(id, valor, dataPagamento, statusPagamento, metodoPagamento) {
    const query = `
      UPDATE pagamentos 
      SET valor = $2, data_pagamento = $3, status_pagamento = $4, metodo_pagamento = $5, atualizado_em = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query(query, [id, valor, dataPagamento, statusPagamento, metodoPagamento]);
    return result.rows[0];
  }

  async deletar(id) {
    const query = 'DELETE FROM pagamentos WHERE id = $1';
    await pool.query(query, [id]);
  }
}

module.exports = new PagamentoRepository();
