// Aplicação Principal - Controle de fluxo e carregamento de componentes
class ClinicApp {
  constructor() {
    this.componentCache = {};
    this.currentPacientes = [];
    this.currentConsultas = [];
    this.currentProntuarios = [];
    this.currentPagamentos = [];
  }

  // Inicializar aplicação
  async init() {
    if (!auth.isAuthenticated()) {
      this.showLoginPage();
    } else {
      await this.showDashboard();
    }
  }

  // Carregar componentes HTML dinamicamente
  async loadComponent(path) {
    if (this.componentCache[path]) {
      return this.componentCache[path];
    }

    try {
      const response = await fetch(path);
      const html = await response.text();
      this.componentCache[path] = html;
      return html;
    } catch (error) {
      console.error(`Erro ao carregar componente ${path}:`, error);
      return '';
    }
  }

  // Exibir página de login
  async showLoginPage() {
    const loginPage = document.getElementById('loginPage');
    const dashboardPage = document.getElementById('dashboardPage');
    
    if (loginPage) loginPage.style.display = 'block';
    if (dashboardPage) dashboardPage.style.display = 'none';
    
    this.setupLoginForm();
  }

  // Configurar formulário de login
  setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
      loginForm.onsubmit = async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        const sucesso = await auth.login(email, senha);
        if (sucesso) {
          await this.showDashboard();
        } else {
          utils.mostrarMensagem('Email ou senha incorretos', 'error');
        }
      };
    }

    if (registerForm) {
      registerForm.onsubmit = async (e) => {
        e.preventDefault();
        const nome = document.getElementById('regNome').value;
        const email = document.getElementById('regEmail').value;
        const senha = document.getElementById('regSenha').value;
        const tipo = document.getElementById('tipoUsuario').value;

        if (!utils.validarEmail(email)) {
          utils.mostrarMensagem('Email inválido', 'error');
          return;
        }

        if (!utils.validarSenha(senha)) {
          utils.mostrarMensagem('Senha deve ter pelo menos 6 caracteres', 'error');
          return;
        }

        const sucesso = await auth.registrar(nome, email, senha, tipo);
        if (sucesso) {
          utils.mostrarMensagem('Cadastro realizado com sucesso!', 'success');
          await this.showDashboard();
        } else {
          utils.mostrarMensagem('Erro ao cadastrar usuário', 'error');
        }
      };
    }
  }

  // Exibir dashboard
  async showDashboard() {
    const loginPage = document.getElementById('loginPage');
    const dashboardPage = document.getElementById('dashboardPage');
    
    if (loginPage) loginPage.style.display = 'none';
    if (dashboardPage) dashboardPage.style.display = 'block';

    // Carregar navbar
    await this.loadNavbar();

    // Carregar dashboard por padrão
    await this.showSection('dashboard');

    // Carregar dados iniciais
    await this.loadDashboardStats();
  }

  // Carregar navbar
  async loadNavbar() {
    const navbarHTML = await this.loadComponent('/components/navbar.html');
    const navContainer = document.querySelector('.navbar');
    if (navContainer) {
      navContainer.innerHTML = navbarHTML;
    }
  }

  // Mostrar seção
  async showSection(sectionId) {
    // Ocultar todas as seções
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');

    // Mostrar seção selecionada
    const section = document.getElementById(sectionId);
    if (section) section.style.display = 'block';

    // Carregar dados da seção
    switch (sectionId) {
      case 'dashboard':
        await this.loadDashboardStats();
        break;
      case 'pacientes':
        await this.loadPacientes();
        break;
      case 'consultas':
        await this.loadConsultas();
        break;
      case 'prontuarios':
        await this.loadProntuarios();
        break;
      case 'pagamentos':
        await this.loadPagamentos();
        break;
    }
  }

  // DASHBOARD
  async loadDashboardStats() {
    try {
      const statsHTML = await this.loadComponent('/components/dashboard-stats.html');
      const container = document.getElementById('dashboardStatsContainer');
      if (container) container.innerHTML = statsHTML;

      // Carregar dados
      const pacientes = await api.listarPacientes();
      const consultas = await api.listarConsultas();
      const pagamentos = await api.listarPagamentos();

      document.getElementById('totalPacientes').textContent = pacientes.length || 0;
      document.getElementById('consultasHoje').textContent = this.contagemConsultasHoje(consultas);
      document.getElementById('receitaMes').textContent = this.calcularReceitaMes(pagamentos);
      document.getElementById('pendencias').textContent = this.contagemPendencias(pagamentos);
    } catch (error) {
      console.error('Erro ao carregar stats:', error);
    }
  }

  // PACIENTES
  async loadPacientes() {
    try {
      const tableHTML = await this.loadComponent('/components/table-pacientes.html');
      const modalHTML = await this.loadComponent('/components/modal-paciente.html');
      
      const container = document.getElementById('pacientesTableContainer');
      const appContainer = document.getElementById('app');
      
      if (container) container.innerHTML = tableHTML;
      if (appContainer && !document.getElementById('modalPaciente')) {
        appContainer.insertAdjacentHTML('beforeend', modalHTML);
      }

      this.currentPacientes = await api.listarPacientes();
      this.renderTabelaPacientes();
      this.setupFormPaciente();
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
      utils.mostrarMensagem('Erro ao carregar pacientes', 'error');
    }
  }

  renderTabelaPacientes() {
    const tbody = document.getElementById('pacientesList');
    if (!tbody) return;

    if (this.currentPacientes.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5">Nenhum paciente cadastrado</td></tr>';
      return;
    }

    tbody.innerHTML = this.currentPacientes.map(paciente => `
      <tr>
        <td>${paciente.nome}</td>
        <td>${paciente.cpf ? utils.formatarCPF(paciente.cpf) : '-'}</td>
        <td>${paciente.telefone ? utils.formatarTelefone(paciente.telefone) : '-'}</td>
        <td>${paciente.email || '-'}</td>
        <td>
          <button class="btn btn-small" onclick="app.editarPaciente(${paciente.id})">Editar</button>
          <button class="btn btn-danger btn-small" onclick="app.deletarPacienteConfirm(${paciente.id})">Deletar</button>
        </td>
      </tr>
    `).join('');
  }

  setupFormPaciente() {
    const form = document.getElementById('formPaciente');
    if (!form) return;

    form.onsubmit = async (e) => {
      e.preventDefault();

      const dados = {
        nome: document.getElementById('nomePaciente').value,
        cpf: document.getElementById('cpfPaciente').value,
        data_nascimento: document.getElementById('dataNascimento').value,
        telefone: document.getElementById('telefonePaciente').value,
        email: document.getElementById('emailPaciente').value,
        endereco: document.getElementById('enderecoPaciente').value
      };

      try {
        await api.criarPaciente(dados);
        utils.mostrarMensagem('Paciente cadastrado com sucesso!', 'success');
        this.closeModalPaciente();
        await this.loadPacientes();
      } catch (error) {
        utils.mostrarMensagem('Erro ao cadastrar paciente', 'error');
      }
    };
  }

  // CONSULTAS
  async loadConsultas() {
    try {
      const tableHTML = await this.loadComponent('/components/table-consultas.html');
      const modalHTML = await this.loadComponent('/components/modal-consulta.html');
      
      const container = document.getElementById('consultasTableContainer');
      const appContainer = document.getElementById('app');
      
      if (container) container.innerHTML = tableHTML;
      if (appContainer && !document.getElementById('modalConsulta')) {
        appContainer.insertAdjacentHTML('beforeend', modalHTML);
      }

      this.currentConsultas = await api.listarConsultas();
      await this.loadPacientesParaSelect('pacienteConsulta');
      this.renderTabelaConsultas();
      this.setupFormConsulta();
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
      utils.mostrarMensagem('Erro ao carregar consultas', 'error');
    }
  }

  renderTabelaConsultas() {
    const tbody = document.getElementById('consultasList');
    if (!tbody) return;

    if (this.currentConsultas.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5">Nenhuma consulta agendada</td></tr>';
      return;
    }

    tbody.innerHTML = this.currentConsultas.map(consulta => `
      <tr>
        <td>${consulta.paciente?.nome || 'Desconhecido'}</td>
        <td>${utils.formatarDataHora(consulta.data_consulta)}</td>
        <td>${consulta.dentista || '-'}</td>
        <td><span class="badge badge-info">Agendada</span></td>
        <td>
          <button class="btn btn-small" onclick="app.editarConsulta(${consulta.id})">Editar</button>
          <button class="btn btn-danger btn-small" onclick="app.deletarConsultaConfirm(${consulta.id})">Deletar</button>
        </td>
      </tr>
    `).join('');
  }

  setupFormConsulta() {
    const form = document.getElementById('formConsulta');
    if (!form) return;

    form.onsubmit = async (e) => {
      e.preventDefault();

      const dados = {
        paciente_id: document.getElementById('pacienteConsulta').value,
        dentista: document.getElementById('dentista').value,
        data_consulta: document.getElementById('dataConsulta').value,
        descricao: document.getElementById('descricao').value
      };

      try {
        await api.criarConsulta(dados);
        utils.mostrarMensagem('Consulta agendada com sucesso!', 'success');
        this.closeModalConsulta();
        await this.loadConsultas();
      } catch (error) {
        utils.mostrarMensagem('Erro ao agendar consulta', 'error');
      }
    };
  }

  // PRONTUÁRIOS
  async loadProntuarios() {
    try {
      const tableHTML = await this.loadComponent('/components/table-prontuarios.html');
      const modalHTML = await this.loadComponent('/components/modal-prontuario.html');
      
      const container = document.getElementById('prontuariosTableContainer');
      const appContainer = document.getElementById('app');
      
      if (container) container.innerHTML = tableHTML;
      if (appContainer && !document.getElementById('modalProntuario')) {
        appContainer.insertAdjacentHTML('beforeend', modalHTML);
      }

      this.currentProntuarios = await api.listarProntuarios();
      await this.loadPacientesParaSelect('pacienteProntuario');
      this.renderTabelaProntuarios();
      this.setupFormProntuario();
    } catch (error) {
      console.error('Erro ao carregar prontuários:', error);
      utils.mostrarMensagem('Erro ao carregar prontuários', 'error');
    }
  }

  renderTabelaProntuarios() {
    const tbody = document.getElementById('prontuariosList');
    if (!tbody) return;

    if (this.currentProntuarios.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5">Nenhum prontuário registrado</td></tr>';
      return;
    }

    tbody.innerHTML = this.currentProntuarios.map(prontuario => `
      <tr>
        <td>${prontuario.paciente?.nome || 'Desconhecido'}</td>
        <td>${utils.formatarData(prontuario.created_at)}</td>
        <td>${prontuario.procedimentos || '-'}</td>
        <td>${prontuario.alergias || '-'}</td>
        <td>
          <button class="btn btn-small" onclick="app.editarProntuario(${prontuario.id})">Editar</button>
          <button class="btn btn-danger btn-small" onclick="app.deletarProntuarioConfirm(${prontuario.id})">Deletar</button>
        </td>
      </tr>
    `).join('');
  }

  setupFormProntuario() {
    const form = document.getElementById('formProntuario');
    if (!form) return;

    form.onsubmit = async (e) => {
      e.preventDefault();

      const dados = {
        paciente_id: document.getElementById('pacienteProntuario').value,
        historico_medico: document.getElementById('historicoMedico').value,
        alergias: document.getElementById('alergias').value,
        medicamentos: document.getElementById('medicamentos').value,
        procedimentos: document.getElementById('procedimentos').value
      };

      try {
        await api.criarProntuario(dados);
        utils.mostrarMensagem('Prontuário criado com sucesso!', 'success');
        this.closeModalProntuario();
        await this.loadProntuarios();
      } catch (error) {
        utils.mostrarMensagem('Erro ao criar prontuário', 'error');
      }
    };
  }

  // PAGAMENTOS
  async loadPagamentos() {
    try {
      const tableHTML = await this.loadComponent('/components/table-pagamentos.html');
      const modalHTML = await this.loadComponent('/components/modal-pagamento.html');
      
      const container = document.getElementById('pagamentosTableContainer');
      const appContainer = document.getElementById('app');
      
      if (container) container.innerHTML = tableHTML;
      if (appContainer && !document.getElementById('modalPagamento')) {
        appContainer.insertAdjacentHTML('beforeend', modalHTML);
      }

      this.currentPagamentos = await api.listarPagamentos();
      await this.loadPacientesParaSelect('pacientePagamento');
      await this.loadConsultasParaSelect('consulta');
      this.renderTabelaPagamentos();
      this.setupFormPagamento();
    } catch (error) {
      console.error('Erro ao carregar pagamentos:', error);
      utils.mostrarMensagem('Erro ao carregar pagamentos', 'error');
    }
  }

  renderTabelaPagamentos() {
    const tbody = document.getElementById('pagamentosList');
    if (!tbody) return;

    if (this.currentPagamentos.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6">Nenhum pagamento registrado</td></tr>';
      return;
    }

    tbody.innerHTML = this.currentPagamentos.map(pagamento => `
      <tr>
        <td>${pagamento.paciente?.nome || 'Desconhecido'}</td>
        <td>${utils.formatarMoeda(pagamento.valor)}</td>
        <td>${utils.formatarData(pagamento.data_pagamento)}</td>
        <td>${pagamento.metodo_pagamento || '-'}</td>
        <td><span class="badge badge-success">Pago</span></td>
        <td>
          <button class="btn btn-small" onclick="app.editarPagamento(${pagamento.id})">Editar</button>
          <button class="btn btn-danger btn-small" onclick="app.deletarPagamentoConfirm(${pagamento.id})">Deletar</button>
        </td>
      </tr>
    `).join('');
  }

  setupFormPagamento() {
    const form = document.getElementById('formPagamento');
    if (!form) return;

    form.onsubmit = async (e) => {
      e.preventDefault();

      const dados = {
        paciente_id: document.getElementById('pacientePagamento').value,
        consulta_id: document.getElementById('consulta').value,
        valor: parseFloat(document.getElementById('valor').value),
        data_pagamento: document.getElementById('dataPagamento').value,
        metodo_pagamento: document.getElementById('metodo').value
      };

      try {
        await api.criarPagamento(dados);
        utils.mostrarMensagem('Pagamento registrado com sucesso!', 'success');
        this.closeModalPagamento();
        await this.loadPagamentos();
      } catch (error) {
        utils.mostrarMensagem('Erro ao registrar pagamento', 'error');
      }
    };
  }

  // HELPERS
  async loadPacientesParaSelect(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;

    const pacientes = await api.listarPacientes();
    select.innerHTML = '<option value="">Selecione um paciente</option>' +
      pacientes.map(p => `<option value="${p.id}">${p.nome}</option>`).join('');
  }

  async loadConsultasParaSelect(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;

    const consultas = await api.listarConsultas();
    select.innerHTML = '<option value="">Selecione uma consulta</option>' +
      consultas.map(c => `<option value="${c.id}">${c.id}</option>`).join('');
  }

  contagemConsultasHoje(consultas) {
    const hoje = new Date().toDateString();
    return consultas.filter(c => new Date(c.data_consulta).toDateString() === hoje).length;
  }

  calcularReceitaMes(pagamentos) {
    const agora = new Date();
    const receitaMes = pagamentos
      .filter(p => {
        const data = new Date(p.data_pagamento);
        return data.getMonth() === agora.getMonth() && data.getFullYear() === agora.getFullYear();
      })
      .reduce((total, p) => total + p.valor, 0);
    
    return utils.formatarMoeda(receitaMes);
  }

  contagemPendencias(pagamentos) {
    return pagamentos.filter(p => p.status === 'pendente').length;
  }

  // MODAIS
  showModalPaciente() {
    const modal = document.getElementById('modalPaciente');
    if (modal) modal.style.display = 'block';
  }

  closeModalPaciente() {
    const modal = document.getElementById('modalPaciente');
    if (modal) modal.style.display = 'none';
    utils.limparForm('formPaciente');
  }

  showModalConsulta() {
    const modal = document.getElementById('modalConsulta');
    if (modal) modal.style.display = 'block';
  }

  closeModalConsulta() {
    const modal = document.getElementById('modalConsulta');
    if (modal) modal.style.display = 'none';
    utils.limparForm('formConsulta');
  }

  showModalProntuario() {
    const modal = document.getElementById('modalProntuario');
    if (modal) modal.style.display = 'block';
  }

  closeModalProntuario() {
    const modal = document.getElementById('modalProntuario');
    if (modal) modal.style.display = 'none';
    utils.limparForm('formProntuario');
  }

  showModalPagamento() {
    const modal = document.getElementById('modalPagamento');
    if (modal) modal.style.display = 'block';
  }

  closeModalPagamento() {
    const modal = document.getElementById('modalPagamento');
    if (modal) modal.style.display = 'none';
    utils.limparForm('formPagamento');
  }

  // DELETE
  deletarPacienteConfirm(id) {
    if (confirm('Tem certeza que deseja deletar este paciente?')) {
      this.deletarPaciente(id);
    }
  }

  async deletarPaciente(id) {
    try {
      await api.deletarPaciente(id);
      utils.mostrarMensagem('Paciente deletado com sucesso!', 'success');
      await this.loadPacientes();
    } catch (error) {
      utils.mostrarMensagem('Erro ao deletar paciente', 'error');
    }
  }

  deletarConsultaConfirm(id) {
    if (confirm('Tem certeza que deseja cancelar esta consulta?')) {
      this.deletarConsulta(id);
    }
  }

  async deletarConsulta(id) {
    try {
      await api.deletarConsulta(id);
      utils.mostrarMensagem('Consulta cancelada com sucesso!', 'success');
      await this.loadConsultas();
    } catch (error) {
      utils.mostrarMensagem('Erro ao cancelar consulta', 'error');
    }
  }

  deletarProntuarioConfirm(id) {
    if (confirm('Tem certeza que deseja deletar este prontuário?')) {
      this.deletarProntuario(id);
    }
  }

  async deletarProntuario(id) {
    try {
      await api.deletarProntuario(id);
      utils.mostrarMensagem('Prontuário deletado com sucesso!', 'success');
      await this.loadProntuarios();
    } catch (error) {
      utils.mostrarMensagem('Erro ao deletar prontuário', 'error');
    }
  }

  deletarPagamentoConfirm(id) {
    if (confirm('Tem certeza que deseja deletar este pagamento?')) {
      this.deletarPagamento(id);
    }
  }

  async deletarPagamento(id) {
    try {
      await api.deletarPagamento(id);
      utils.mostrarMensagem('Pagamento deletado com sucesso!', 'success');
      await this.loadPagamentos();
    } catch (error) {
      utils.mostrarMensagem('Erro ao deletar pagamento', 'error');
    }
  }

  // EDITAR (placeholders)
  editarPaciente(id) {
    utils.mostrarMensagem('Função de edição em desenvolvimento', 'error');
  }

  editarConsulta(id) {
    utils.mostrarMensagem('Função de edição em desenvolvimento', 'error');
  }

  editarProntuario(id) {
    utils.mostrarMensagem('Função de edição em desenvolvimento', 'error');
  }

  editarPagamento(id) {
    utils.mostrarMensagem('Função de edição em desenvolvimento', 'error');
  }
}

// Instância global
const app = new ClinicApp();

// Inicializar ao carregar página
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
