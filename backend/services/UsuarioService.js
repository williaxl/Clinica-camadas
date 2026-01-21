const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsuarioRepository = require('../repositories/UsuarioRepository');

class UsuarioService {
  async registrar(nome, email, senha, tipoUsuario) {
    // Validar dados
    if (!nome || !email || !senha || !tipoUsuario) {
      throw new Error('Nome, email, senha e tipo de usuário são obrigatórios');
    }

    if (!['dentista', 'secretaria'].includes(tipoUsuario)) {
      throw new Error('Tipo de usuário inválido');
    }

    // Verificar se email já existe
    const usuarioExistente = await UsuarioRepository.buscarPorEmail(email);
    if (usuarioExistente) {
      throw new Error('Email já cadastrado');
    }

    // Criptografar senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criar usuário
    const usuario = await UsuarioRepository.criarUsuario(nome, email, senhaHash, tipoUsuario);
    return usuario;
  }

  async autenticar(email, senha) {
    const usuario = await UsuarioRepository.buscarPorEmail(email);
    if (!usuario) {
      throw new Error('Email ou senha inválidos');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new Error('Email ou senha inválidos');
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, tipo: usuario.tipo_usuario },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo_usuario: usuario.tipo_usuario
      }
    };
  }

  async buscarPorId(id) {
    return await UsuarioRepository.buscarPorId(id);
  }

  async listarTodos() {
    return await UsuarioRepository.listarTodos();
  }

  async atualizar(id, nome, email) {
    return await UsuarioRepository.atualizar(id, nome, email);
  }

  async deletar(id) {
    await UsuarioRepository.deletar(id);
  }
}

module.exports = new UsuarioService();
