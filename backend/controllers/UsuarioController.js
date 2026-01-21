const UsuarioService = require('../services/UsuarioService');

class UsuarioController {
  async registrar(req, res) {
    try {
      const { nome, email, senha, tipo_usuario } = req.body;
      const usuario = await UsuarioService.registrar(nome, email, senha, tipo_usuario);
      return res.status(201).json({
        mensagem: 'Usuário criado com sucesso',
        usuario
      });
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async autenticar(req, res) {
    try {
      const { email, senha } = req.body;
      const resultado = await UsuarioService.autenticar(email, senha);
      return res.status(200).json(resultado);
    } catch (erro) {
      return res.status(401).json({ erro: erro.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioService.buscarPorId(id);
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }
      return res.status(200).json(usuario);
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async listarTodos(req, res) {
    try {
      const usuarios = await UsuarioService.listarTodos();
      return res.status(200).json(usuarios);
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, email } = req.body;
      const usuario = await UsuarioService.atualizar(id, nome, email);
      return res.status(200).json({
        mensagem: 'Usuário atualizado com sucesso',
        usuario
      });
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await UsuarioService.deletar(id);
      return res.status(200).json({ mensagem: 'Usuário deletado com sucesso' });
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }
}

module.exports = new UsuarioController();
