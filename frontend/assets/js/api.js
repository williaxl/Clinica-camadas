// Configuração da API
const API_URL = 'http://localhost:5000/api';

class ClinicaAPI {
    constructor() {
        this.token = localStorage.getItem('token');
    }

    // Headers com autenticação
    getHeaders() {
        return {
            'Content-Type': 'application/json',
            ...(this.token && { 'Authorization': `Bearer ${this.token}` })
        };
    }

    // ===== USUÁRIOS =====
    async registrar(nome, email, senha, tipoUsuario) {
        const response = await fetch(`${API_URL}/usuarios/registrar`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ nome, email, senha, tipo_usuario: tipoUsuario })
        });
        return response.json();
    }

    async autenticar(email, senha) {
        const response = await fetch(`${API_URL}/usuarios/autenticar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });
        const data = await response.json();
        if (data.token) {
            this.token = data.token;
            localStorage.setItem('token', data.token);
        }
        return data;
    }

    // ===== PACIENTES =====
    async criarPaciente(paciente) {
        const response = await fetch(`${API_URL}/pacientes`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(paciente)
        });
        return response.json();
    }

    async listarPacientes() {
        const response = await fetch(`${API_URL}/pacientes`, {
            headers: this.getHeaders()
        });
        return response.json();
    }

    async buscarPaciente(id) {
        const response = await fetch(`${API_URL}/pacientes/${id}`, {
            headers: this.getHeaders()
        });
        return response.json();
    }

    async atualizarPaciente(id, paciente) {
        const response = await fetch(`${API_URL}/pacientes/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(paciente)
        });
        return response.json();
    }

    async deletarPaciente(id) {
        const response = await fetch(`${API_URL}/pacientes/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });
        return response.json();
    }

    // ===== CONSULTAS =====
    async criarConsulta(consulta) {
        const response = await fetch(`${API_URL}/consultas`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(consulta)
        });
        return response.json();
    }

    async listarConsultas() {
        const response = await fetch(`${API_URL}/consultas`, {
            headers: this.getHeaders()
        });
        return response.json();
    }

    async listarConsultasPorData(data) {
        const response = await fetch(`${API_URL}/consultas/data?data=${data}`, {
            headers: this.getHeaders()
        });
        return response.json();
    }

    async listarConsultasPorPaciente(pacienteId) {
        const response = await fetch(`${API_URL}/consultas/paciente/${pacienteId}`, {
            headers: this.getHeaders()
        });
        return response.json();
    }

    async buscarConsulta(id) {
        const response = await fetch(`${API_URL}/consultas/${id}`, {
            headers: this.getHeaders()
        });
        return response.json();
    }

    async atualizarConsulta(id, consulta) {
        const response = await fetch(`${API_URL}/consultas/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(consulta)
        });
        return response.json();
    }

    async deletarConsulta(id) {
        const response = await fetch(`${API_URL}/consultas/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });
        return response.json();
    }

    // ===== PRONTUÁRIOS =====
    async criarProntuario(prontuario) {
        const response = await fetch(`${API_URL}/prontuarios`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(prontuario)
        });
        return response.json();
    }

    async buscarProntuarioPorPaciente(pacienteId) {
        const response = await fetch(`${API_URL}/prontuarios/paciente/${pacienteId}`, {
            headers: this.getHeaders()
        });
        return response.json();
    }

    async buscarProntuario(id) {
        const response = await fetch(`${API_URL}/prontuarios/${id}`, {
            headers: this.getHeaders()
        });
        return response.json();
    }

    async atualizarProntuario(id, prontuario) {
        const response = await fetch(`${API_URL}/prontuarios/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(prontuario)
        });
        return response.json();
    }

    // ===== PAGAMENTOS =====
    async criarPagamento(pagamento) {
        const response = await fetch(`${API_URL}/pagamentos`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(pagamento)
        });
        return response.json();
    }

    async listarPagamentos() {
        const response = await fetch(`${API_URL}/pagamentos`, {
            headers: this.getHeaders()
        });
        return response.json();
    }

    async buscarPagamento(id) {
        const response = await fetch(`${API_URL}/pagamentos/${id}`, {
            headers: this.getHeaders()
        });
        return response.json();
    }

    async gerarRelatorioMes(mes, ano) {
        const response = await fetch(`${API_URL}/pagamentos/relatorio/mes?mes=${mes}&ano=${ano}`, {
            headers: this.getHeaders()
        });
        return response.json();
    }

    async atualizarPagamento(id, pagamento) {
        const response = await fetch(`${API_URL}/pagamentos/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(pagamento)
        });
        return response.json();
    }

    async deletarPagamento(id) {
        const response = await fetch(`${API_URL}/pagamentos/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });
        return response.json();
    }
}

// Instância global da API
const api = new ClinicaAPI();
