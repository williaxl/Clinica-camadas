// Serviço de Autenticação
class AuthService {
  constructor() {
    this.token = localStorage.getItem('token');
    this.usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
  }

  async login(email, senha) {
    try {
      const response = await api.login(email, senha);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('usuario', JSON.stringify(response.usuario));
        this.token = response.token;
        this.usuario = response.usuario;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  }

  async registrar(nome, email, senha, tipo_usuario) {
    try {
      const response = await api.registrar(nome, email, senha, tipo_usuario);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('usuario', JSON.stringify(response.usuario));
        this.token = response.token;
        this.usuario = response.usuario;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao registrar:', error);
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.token = null;
    this.usuario = null;
    window.location.href = '/';
  }

  isAuthenticated() {
    return !!this.token && !!this.usuario;
  }

  getUsuario() {
    return this.usuario;
  }

  getToken() {
    return this.token;
  }
}

// Instância global
const auth = new AuthService();
