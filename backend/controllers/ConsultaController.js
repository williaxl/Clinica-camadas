const ConsultaService = require('../services/ConsultaService');

class ConsultaController {
  async criar(req, res) {
    try {
      const { paciente_id, dentista_id, data_consulta, hora_consulta, observacoes } = req.body;
      const consulta = await ConsultaService.criar(paciente_id, dentista_id, data_consulta, hora_consulta, observacoes);
      return res.status(201).json({
        mensagem: 'Consulta agendada com sucesso',
        consulta
      });
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const consulta = await ConsultaService.buscarPorId(id);
      if (!consulta) {
        return res.status(404).json({ erro: 'Consulta não encontrada' });
      }
      return res.status(200).json(consulta);
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async listarPorData(req, res) {
    try {
      const { data } = req.query;
      if (!data) {
        return res.status(400).json({ erro: 'Data é obrigatória' });
      }
      const consultas = await ConsultaService.listarPorData(data);
      return res.status(200).json(consultas);
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async listarPorPaciente(req, res) {
    try {
      const { paciente_id } = req.params;
      const consultas = await ConsultaService.listarPorPaciente(paciente_id);
      return res.status(200).json(consultas);
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async listarTodas(req, res) {
    try {
      const consultas = await ConsultaService.listarTodas();
      return res.status(200).json(consultas);
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { data_consulta, hora_consulta, status, observacoes } = req.body;
      const consulta = await ConsultaService.atualizar(id, data_consulta, hora_consulta, status, observacoes);
      return res.status(200).json({
        mensagem: 'Consulta atualizada com sucesso',
        consulta
      });
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await ConsultaService.deletar(id);
      return res.status(200).json({ mensagem: 'Consulta deletada com sucesso' });
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }
}

module.exports = new ConsultaController();
