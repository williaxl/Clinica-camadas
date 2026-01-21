const PagamentoService = require('../services/PagamentoService');

class PagamentoController {
  async criar(req, res) {
    try {
      const { consulta_id, valor, data_pagamento, status_pagamento, metodo_pagamento } = req.body;
      const pagamento = await PagamentoService.criar(consulta_id, valor, data_pagamento, status_pagamento, metodo_pagamento);
      return res.status(201).json({
        mensagem: 'Pagamento registrado com sucesso',
        pagamento
      });
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const pagamento = await PagamentoService.buscarPorId(id);
      if (!pagamento) {
        return res.status(404).json({ erro: 'Pagamento não encontrado' });
      }
      return res.status(200).json(pagamento);
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async buscarPorConsultaId(req, res) {
    try {
      const { consulta_id } = req.params;
      const pagamento = await PagamentoService.buscarPorConsultaId(consulta_id);
      if (!pagamento) {
        return res.status(404).json({ erro: 'Pagamento não encontrado' });
      }
      return res.status(200).json(pagamento);
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async listarTodos(req, res) {
    try {
      const pagamentos = await PagamentoService.listarTodos();
      return res.status(200).json(pagamentos);
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async gerarRelatorioMes(req, res) {
    try {
      const { mes, ano } = req.query;
      if (!mes || !ano) {
        return res.status(400).json({ erro: 'Mês e ano são obrigatórios' });
      }
      const relatorio = await PagamentoService.gerarRelatorioMes(parseInt(mes), parseInt(ano));
      return res.status(200).json(relatorio);
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { valor, data_pagamento, status_pagamento, metodo_pagamento } = req.body;
      const pagamento = await PagamentoService.atualizar(id, valor, data_pagamento, status_pagamento, metodo_pagamento);
      return res.status(200).json({
        mensagem: 'Pagamento atualizado com sucesso',
        pagamento
      });
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await PagamentoService.deletar(id);
      return res.status(200).json({ mensagem: 'Pagamento deletado com sucesso' });
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }
}

module.exports = new PagamentoController();
