const ProntuarioRepository = require('../repositories/ProntuarioRepository');

class ProntuarioService {
  async criar(pacienteId, historicoTratamentos = '', evolucoes = '', alergias = '', observacoes = '') {
    if (!pacienteId) {
      throw new Error('Paciente é obrigatório');
    }

    return await ProntuarioRepository.criar(pacienteId, historicoTratamentos, evolucoes, alergias, observacoes);
  }

  async buscarPorPacienteId(pacienteId) {
    return await ProntuarioRepository.buscarPorPacienteId(pacienteId);
  }

  async buscarPorId(id) {
    return await ProntuarioRepository.buscarPorId(id);
  }

  async atualizar(id, historicoTratamentos, evolucoes, alergias, observacoes) {
    return await ProntuarioRepository.atualizar(id, historicoTratamentos, evolucoes, alergias, observacoes);
  }

  async deletar(id) {
    await ProntuarioRepository.deletar(id);
  }
}

module.exports = new ProntuarioService();
