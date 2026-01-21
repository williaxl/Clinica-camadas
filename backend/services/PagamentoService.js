const PagamentoRepository = require('../repositories/PagamentoRepository');

class PagamentoService {
  async criar(consultaId, valor, dataPagamento, statusPagamento = 'pendente', metodoPagamento) {
    if (!consultaId || !valor || !dataPagamento) {
      throw new Error('Consulta, valor e data de pagamento são obrigatórios');
    }

    if (valor <= 0) {
      throw new Error('Valor deve ser maior que zero');
    }

    return await PagamentoRepository.criar(consultaId, valor, dataPagamento, statusPagamento, metodoPagamento);
  }

  async buscarPorId(id) {
    return await PagamentoRepository.buscarPorId(id);
  }

  async buscarPorConsultaId(consultaId) {
    return await PagamentoRepository.buscarPorConsultaId(consultaId);
  }

  async listarTodos() {
    return await PagamentoRepository.listarTodos();
  }

  async listarPorMes(mes, ano) {
    return await PagamentoRepository.listarPorMes(mes, ano);
  }

  async atualizar(id, valor, dataPagamento, statusPagamento, metodoPagamento) {
    if (!['pendente', 'pago', 'cancelado'].includes(statusPagamento)) {
      throw new Error('Status de pagamento inválido');
    }

    return await PagamentoRepository.atualizar(id, valor, dataPagamento, statusPagamento, metodoPagamento);
  }

  async deletar(id) {
    await PagamentoRepository.deletar(id);
  }

  async gerarRelatorioMes(mes, ano) {
    const pagamentos = await PagamentoRepository.listarPorMes(mes, ano);
    
    const totalRecebido = pagamentos
      .filter(p => p.status_pagamento === 'pago')
      .reduce((sum, p) => sum + parseFloat(p.valor), 0);

    const totalPendente = pagamentos
      .filter(p => p.status_pagamento === 'pendente')
      .reduce((sum, p) => sum + parseFloat(p.valor), 0);

    return {
      mes,
      ano,
      totalPagamentos: pagamentos.length,
      totalRecebido,
      totalPendente,
      detalhes: pagamentos
    };
  }
}

module.exports = new PagamentoService();
