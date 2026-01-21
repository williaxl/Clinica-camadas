const PacienteService = require('../services/PacienteService');

class PacienteController {
  async criar(req, res) {
    try {
      const { nome, cpf, data_nascimento, telefone, endereco, email } = req.body;
      const paciente = await PacienteService.criar(nome, cpf, data_nascimento, telefone, endereco, email);
      return res.status(201).json({
        mensagem: 'Paciente criado com sucesso',
        paciente
      });
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const paciente = await PacienteService.buscarPorId(id);
      if (!paciente) {
        return res.status(404).json({ erro: 'Paciente não encontrado' });
      }
      return res.status(200).json(paciente);
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async listarTodos(req, res) {
    try {
      const pacientes = await PacienteService.listarTodos();
      return res.status(200).json(pacientes);
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async buscarPorCPF(req, res) {
    try {
      const { cpf } = req.query;
      if (!cpf) {
        return res.status(400).json({ erro: 'CPF é obrigatório' });
      }
      const paciente = await PacienteService.buscarPorCPF(cpf);
      if (!paciente) {
        return res.status(404).json({ erro: 'Paciente não encontrado' });
      }
      return res.status(200).json(paciente);
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, cpf, data_nascimento, telefone, endereco, email } = req.body;
      const paciente = await PacienteService.atualizar(id, nome, cpf, data_nascimento, telefone, endereco, email);
      return res.status(200).json({
        mensagem: 'Paciente atualizado com sucesso',
        paciente
      });
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await PacienteService.deletar(id);
      return res.status(200).json({ mensagem: 'Paciente deletado com sucesso' });
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }
}

module.exports = new PacienteController();
