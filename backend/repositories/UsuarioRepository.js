const { query, queryOne } = require('../config/sqlite-helper');

class UsuarioRepository {
  async criarUsuario(nome, email, senhaHash, tipoUsuario) {
    const sql = `
      INSERT INTO usuarios (nome, email, senha, tipo_usuario)
      VALUES (?, ?, ?, ?)
    `;
    const result = await query(sql, [nome, email, senhaHash, tipoUsuario]);
    if (result.lastID) {
      return { id: result.lastID, nome, email, tipo_usuario: tipoUsuario };
    }
    return null;
  }

  async buscarPorEmail(email) {
    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    return await queryOne(sql, [email]);
  }

  async buscarPorId(id) {
    const sql = 'SELECT id, nome, email, tipo_usuario, ativo FROM usuarios WHERE id = ?';
    return await queryOne(sql, [id]);
  }

  async listarTodos() {
    const sql = 'SELECT id, nome, email, tipo_usuario, ativo, criado_em FROM usuarios';
    const result = await query(sql);
    return result.rows;
  }

  async atualizar(id, nome, email) {
    const sql = `
      UPDATE usuarios 
      SET nome = ?, email = ?, atualizado_em = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const result = await query(sql, [nome, email, id]);
    return { id, nome, email, tipo_usuario: null };
  }

  async deletar(id) {
    const sql = 'DELETE FROM usuarios WHERE id = ?';
    await query(sql, [id]);
  }
}

module.exports = new UsuarioRepository();
