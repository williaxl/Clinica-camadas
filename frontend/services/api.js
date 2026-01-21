// Serviço de API centralizado
class APIService {
  constructor(baseURL = 'http://localhost:5000/api') {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('token');
  }

  // Método genérico para requisições
  async request(endpoint, method = 'GET', data = null) {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (this.token) {
      config.headers['Authorization'] = `Bearer ${this.token}`;
    }

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/';
        }
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  }

  // AUTENTICAÇÃO
  async login(email, senha) {
    return this.request('/usuarios/login', 'POST', { email, senha });
  }

  async registrar(nome, email, senha, tipo_usuario) {
    return this.request('/usuarios/registrar', 'POST', {
      nome,
      email,
      senha,
      tipo_usuario
    });
  }

  // PACIENTES
  async listarPacientes() {
    return this.request('/pacientes');
  }

  async buscarPaciente(id) {
    return this.request(`/pacientes/${id}`);
  }

  async criarPaciente(dados) {
    return this.request('/pacientes', 'POST', dados);
  }

  async atualizarPaciente(id, dados) {
    return this.request(`/pacientes/${id}`, 'PUT', dados);
  }

  async deletarPaciente(id) {
    return this.request(`/pacientes/${id}`, 'DELETE');
  }

  // CONSULTAS
  async listarConsultas() {
    return this.request('/consultas');
  }

  async buscarConsulta(id) {
    return this.request(`/consultas/${id}`);
  }

  async criarConsulta(dados) {
    return this.request('/consultas', 'POST', dados);
  }

  async atualizarConsulta(id, dados) {
    return this.request(`/consultas/${id}`, 'PUT', dados);
  }

  async deletarConsulta(id) {
    return this.request(`/consultas/${id}`, 'DELETE');
  }

  // PRONTUÁRIOS
  async listarProntuarios() {
    return this.request('/prontuarios');
  }

  async buscarProntuario(id) {
    return this.request(`/prontuarios/${id}`);
  }

  async criarProntuario(dados) {
    return this.request('/prontuarios', 'POST', dados);
  }

  async atualizarProntuario(id, dados) {
    return this.request(`/prontuarios/${id}`, 'PUT', dados);
  }

  async deletarProntuario(id) {
    return this.request(`/prontuarios/${id}`, 'DELETE');
  }

  // PAGAMENTOS
  async listarPagamentos() {
    return this.request('/pagamentos');
  }

  async buscarPagamento(id) {
    return this.request(`/pagamentos/${id}`);
  }

  async criarPagamento(dados) {
    return this.request('/pagamentos', 'POST', dados);
  }

  async atualizarPagamento(id, dados) {
    return this.request(`/pagamentos/${id}`, 'PUT', dados);
  }

  async deletarPagamento(id) {
    return this.request(`/pagamentos/${id}`, 'DELETE');
  }

  // RELATÓRIOS
  async gerarRelatorioMesConsultas() {
    return this.request('/consultas/relatorio/mes');
  }

  async gerarRelatorioMesPagamentos() {
    return this.request('/pagamentos/relatorio/mes');
  }
}

// Instância global
const api = new APIService();
