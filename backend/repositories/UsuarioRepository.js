const pool = require('../config/database');

class UsuarioRepository {
  async criarUsuario(nome, email, senhaHash, tipoUsuario) {
    const query = `
      INSERT INTO usuarios (nome, email, senha, tipo_usuario)
      VALUES ($1, $2, $3, $4)
      RETURNING id, nome, email, tipo_usuario
    `;
    const result = await pool.query(query, [nome, email, senhaHash, tipoUsuario]);
    return result.rows[0];
  }

  async buscarPorEmail(email) {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  async buscarPorId(id) {
    const query = 'SELECT id, nome, email, tipo_usuario, ativo FROM usuarios WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  async listarTodos() {
    const query = 'SELECT id, nome, email, tipo_usuario, ativo, criado_em FROM usuarios';
    const result = await pool.query(query);
    return result.rows;
  }

  async atualizar(id, nome, email) {
    const query = `
      UPDATE usuarios 
      SET nome = $2, email = $3, atualizado_em = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING id, nome, email, tipo_usuario
    `;
    const result = await pool.query(query, [id, nome, email]);
    return result.rows[0];
  }

  async deletar(id) {
    const query = 'DELETE FROM usuarios WHERE id = $1';
    await pool.query(query, [id]);
  }
}

module.exports = new UsuarioRepository();
