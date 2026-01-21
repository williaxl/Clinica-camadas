const PacienteRepository = require('../repositories/PacienteRepository');

class PacienteService {
  async criar(nome, cpf, dataNascimento, telefone, endereco, email) {
    if (!nome) {
      throw new Error('Nome do paciente é obrigatório');
    }

    if (cpf) {
      const pacienteExistente = await PacienteRepository.buscarPorCPF(cpf);
      if (pacienteExistente) {
        throw new Error('Paciente com este CPF já está cadastrado');
      }
    }

    return await PacienteRepository.criar(nome, cpf, dataNascimento, telefone, endereco, email);
  }

  async buscarPorId(id) {
    return await PacienteRepository.buscarPorId(id);
  }

  async listarTodos() {
    return await PacienteRepository.listarTodos();
  }

  async buscarPorCPF(cpf) {
    return await PacienteRepository.buscarPorCPF(cpf);
  }

  async atualizar(id, nome, cpf, dataNascimento, telefone, endereco, email) {
    if (!nome) {
      throw new Error('Nome do paciente é obrigatório');
    }

    return await PacienteRepository.atualizar(id, nome, cpf, dataNascimento, telefone, endereco, email);
  }

  async deletar(id) {
    await PacienteRepository.deletar(id);
  }
}

module.exports = new PacienteService();
