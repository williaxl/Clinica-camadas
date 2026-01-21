// Utilitários e Helpers
class Utils {
  // Formatação
  static formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  static formatarDataHora(data) {
    return new Date(data).toLocaleString('pt-BR');
  }

  static formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  static formatarCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  static formatarTelefone(telefone) {
    return telefone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
  }

  // Validações
  static validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  static validarCPF(cpf) {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf);
  }

  static validarSenha(senha) {
    return senha.length >= 6;
  }

  // DOM
  static mostrarMensagem(mensagem, tipo = 'success') {
    const div = document.createElement('div');
    div.className = `alert alert-${tipo}`;
    div.textContent = mensagem;
    div.style.position = 'fixed';
    div.style.top = '20px';
    div.style.right = '20px';
    div.style.zIndex = '9999';
    div.style.padding = '15px 20px';
    div.style.borderRadius = '5px';
    div.style.color = 'white';
    div.style.backgroundColor = tipo === 'success' ? '#4CAF50' : '#f44336';
    
    document.body.appendChild(div);
    
    setTimeout(() => div.remove(), 3000);
  }

  static limparForm(formId) {
    const form = document.getElementById(formId);
    if (form) form.reset();
  }

  // Storage
  static salvarNoLocalStorage(chave, valor) {
    localStorage.setItem(chave, JSON.stringify(valor));
  }

  static obterDoLocalStorage(chave) {
    const valor = localStorage.getItem(chave);
    return valor ? JSON.parse(valor) : null;
  }

  static removerDoLocalStorage(chave) {
    localStorage.removeItem(chave);
  }
}

// Instância global
const utils = new Utils();
