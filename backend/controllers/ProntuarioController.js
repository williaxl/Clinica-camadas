const ProntuarioService = require('../services/ProntuarioService');

class ProntuarioController {
  async criar(req, res) {
    try {
      const { paciente_id, historico_tratamentos, evolucoes, alergias, observacoes } = req.body;
      const prontuario = await ProntuarioService.criar(paciente_id, historico_tratamentos, evolucoes, alergias, observacoes);
      return res.status(201).json({
        mensagem: 'Prontuário criado com sucesso',
        prontuario
      });
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async buscarPorPacienteId(req, res) {
    try {
      const { paciente_id } = req.params;
      const prontuario = await ProntuarioService.buscarPorPacienteId(paciente_id);
      if (!prontuario) {
        return res.status(404).json({ erro: 'Prontuário não encontrado' });
      }
      return res.status(200).json(prontuario);
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const prontuario = await ProntuarioService.buscarPorId(id);
      if (!prontuario) {
        return res.status(404).json({ erro: 'Prontuário não encontrado' });
      }
      return res.status(200).json(prontuario);
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { historico_tratamentos, evolucoes, alergias, observacoes } = req.body;
      const prontuario = await ProntuarioService.atualizar(id, historico_tratamentos, evolucoes, alergias, observacoes);
      return res.status(200).json({
        mensagem: 'Prontuário atualizado com sucesso',
        prontuario
      });
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await ProntuarioService.deletar(id);
      return res.status(200).json({ mensagem: 'Prontuário deletado com sucesso' });
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }
}

module.exports = new ProntuarioController();
