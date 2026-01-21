const ConsultaRepository = require('../repositories/ConsultaRepository');

class ConsultaService {
  async criar(pacienteId, dentistaId, dataConsulta, horaConsulta, observacoes = '') {
    if (!pacienteId || !dentistaId || !dataConsulta || !horaConsulta) {
      throw new Error('Paciente, dentista, data e hora da consulta são obrigatórios');
    }

    return await ConsultaRepository.criar(
      pacienteId,
      dentistaId,
      dataConsulta,
      horaConsulta,
      'agendada',
      observacoes
    );
  }

  async buscarPorId(id) {
    return await ConsultaRepository.buscarPorId(id);
  }

  async listarPorData(data) {
    return await ConsultaRepository.listarPorData(data);
  }

  async listarPorPaciente(pacienteId) {
    return await ConsultaRepository.listarPorPaciente(pacienteId);
  }

  async listarTodas() {
    return await ConsultaRepository.listarTodas();
  }

  async atualizar(id, dataConsulta, horaConsulta, status, observacoes) {
    if (!['agendada', 'realizada', 'cancelada'].includes(status)) {
      throw new Error('Status de consulta inválido');
    }

    return await ConsultaRepository.atualizar(id, dataConsulta, horaConsulta, status, observacoes);
  }

  async deletar(id) {
    await ConsultaRepository.deletar(id);
  }
}

module.exports = new ConsultaService();
