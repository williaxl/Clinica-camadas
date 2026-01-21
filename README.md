# 🦷 Sistema de Gestão de Clínica Odontológica

## 📋 Descrição Geral

Sistema web completo para gerenciamento de clínica odontológica com **arquitetura em 3 camadas** (apresentação, aplicação e persistência). Permite gerenciar pacientes, consultas, prontuários e financeiro de forma segura e organizada.

---

## Requisitos

### Funcionais
-  **RF01** - Autenticação de usuários com JWT
-  **RF02** - Cadastro e gestão de pacientes  
-  **RF03** - Prontuário digital dos pacientes
-  **RF04** - Agenda de consultas por data/hora
-  **RF05** - Controle financeiro e pagamentos
-  **RF06** - Relatórios de receita mensal

### Não Funcionais
-  **RNF01** - Interface simples, intuitiva e responsiva
-  **RNF02** - Acesso web sem instalação (navegador)
-  **RNF03** - Segurança com autenticação e criptografia
-  **RNF04** - Desempenho rápido e responsivo

---

## Arquitetura em 3 Camadas

```
┌──────────────────────────────────┐
│  CAMADA 1: APRESENTAÇÃO (Front)  │
│  HTML5 + CSS3 + JavaScript ES6+  │
│  - 5 Páginas principais          │
│  - 9 Componentes reutilizáveis   │
│  - 3 Services (API, Auth, Utils) │
└──────────────┬───────────────────┘
               │ HTTP/REST
┌──────────────▼───────────────────┐
│ CAMADA 2: APLICAÇÃO (Backend)    │
│ Node.js + Express.js             │
│ - 5 Controllers (requisições)    │
│ - 5 Services (regras de negócio) │
│ - 5 Routes (endpoints)           │
│ - JWT Middleware (autenticação)  │
└──────────────┬───────────────────┘
               │ SQL Queries
┌──────────────▼───────────────────┐
│ CAMADA 3: PERSISTÊNCIA (Banco)   │
│ PostgreSQL + 5 Repositories      │
│ - 6 Tabelas com relacionamentos  │
│ - Índices e constraints          │
│ - Queries otimizadas             │
└──────────────────────────────────┘
```

### Por que 3 Camadas?
1. **Separação de responsabilidades** - Cada camada tem função específica
2. **Baixo acoplamento** - Mudanças em uma camada não afetam as outras
3. **Fácil manutenção** - Código organizado e compreensível
4. **Escalabilidade** - Simples adicionar novas funcionalidades
5. **Testabilidade** - Cada componente pode ser testado independentemente

---

## Tecnologias

### Backend
- **Node.js 14+** - Runtime JavaScript
- **Express 4.18+** - Framework web minimalista
- **SQLite3 5.1+** - Banco de dados relacional (arquivo local)
- **bcryptjs 2.4+** - Hash de senhas
- **jsonwebtoken 9.0.2** - Autenticação JWT
- **CORS 2.8+** - Requisições cross-origin
- **dotenv 16.3+** - Variáveis de ambiente

### Frontend
- **HTML5** - Semântica moderna
- **CSS3** - Responsive design
- **JavaScript ES6+** - Programação orientada a objetos
- **Fetch API** - Requisições HTTP nativas

---

## Estrutura do Projeto

```
Clinica-camadas/
│
├── backend/
│   ├── config/
│   │   ├── database.js        # Configuração SQLite3
│   │   ├── init-db.js         # Script de inicialização
│   │   ├── schema.sql         # Criação de tabelas
│   │   └── sqlite-helper.js   # Helper para promises
│   ├── controllers/           # Recebem requisições HTTP
│   │   ├── UsuarioController.js
│   │   ├── PacienteController.js
│   │   ├── ConsultaController.js
│   │   ├── ProntuarioController.js
│   │   └── PagamentoController.js
│   ├── services/              # Lógica de negócio
│   │   ├── UsuarioService.js
│   │   ├── PacienteService.js
│   │   ├── ConsultaService.js
│   │   ├── ProntuarioService.js
│   │   └── PagamentoService.js
│   ├── repositories/          # Acesso ao banco
│   │   ├── UsuarioRepository.js
│   │   ├── PacienteRepository.js
│   │   ├── ConsultaRepository.js
│   │   ├── ProntuarioRepository.js
│   │   └── PagamentoRepository.js
│   ├── routes/                # Definição de endpoints
│   │   ├── usuariosRoutes.js
│   │   ├── pacientesRoutes.js
│   │   ├── consultasRoutes.js
│   │   ├── prontuariosRoutes.js
│   │   └── pagamentosRoutes.js
│   ├── middleware/
│   │   └── auth.js            # Validação JWT
│   ├── app.js                 # Entrada da aplicação
│   ├── package.json
│   └── .env                   # Variáveis de ambiente
│
├── frontend/
│   ├── index.html             # Página principal
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css      # Estilos globais
│   │   └── js/
│   │       └── app.js         # Lógica principal
│   ├── components/            # Componentes reutilizáveis
│   │   ├── navbar.html
│   │   ├── dashboard-stats.html
│   │   ├── modal-paciente.html
│   │   ├── modal-consulta.html
│   │   ├── modal-prontuario.html
│   │   ├── modal-pagamento.html
│   │   ├── table-pacientes.html
│   │   ├── table-consultas.html
│   │   ├── table-prontuarios.html
│   │   └── table-pagamentos.html
│   ├── pages/                 # Estrutura de páginas
│   │   ├── dashboard.html
│   │   ├── pacientes.html
│   │   ├── consultas.html
│   │   ├── prontuarios.html
│   │   └── pagamentos.html
│   └── services/              # Serviços JavaScript
│       ├── api.js             # Cliente HTTP
│       ├── auth.js            # Autenticação
│       └── utils.js           # Utilitários
│
├── README.md                  # Documentação
└── Levantamento de Requisitos Clinica.docx
```

---

## Como Executar

### Pré-requisitos
- Node.js 14+
- Git

⚠️ **SQLite3 não precisa de instalação separada** - o arquivo `backend/clinica.db` é criado automaticamente!

### 1️⃣ Configurar Backend

```bash
# Entrar na pasta backend
cd backend

# Instalar dependências
npm install

# Inicializar banco de dados SQLite3
node config/init-db.js

# Configurar .env
cat > .env << 'ENV'
PORT=5000
JWT_SECRET=seu_secret_key_muito_seguro_aqui
ENV

# Iniciar servidor
npm start
```

✅ **Banco de dados criado automaticamente em `backend/clinica.db`**

O backend rodará em: **http://localhost:5000**

### 2️⃣ Executar Frontend

**Opção 1: Python HTTP Server**
```bash
cd frontend
python3 -m http.server 8000
```

**Opção 2: Live Server (VS Code)**
- Instale a extensão "Live Server"
- Clique com botão direito em `index.html`
- Selecione "Open with Live Server"

O frontend rodará em: **http://localhost:8000** ou conforme configurado

---

## Autenticação JWT

Sistema implementa autenticação segura com JWT:

1. **Registro**: Usuário cria conta (dentista ou secretária)
2. **Login**: Email + Senha → Backend valida e retorna JWT
3. **Armazenamento**: Token guardado no localStorage
4. **Uso**: Incluído em cada requisição no header: `Authorization: Bearer {token}`
5. **Validação**: Middleware valida token em rotas protegidas
6. **Expiração**: Token válido por 24 horas

---

## API REST

### Autenticação
```
POST   /api/usuarios/registrar       - Criar novo usuário
POST   /api/usuarios/login           - Autenticar usuário
```

### Pacientes
```
GET    /api/pacientes                - Listar todos
GET    /api/pacientes/:id            - Buscar por ID
POST   /api/pacientes                - Criar novo
PUT    /api/pacientes/:id            - Atualizar
DELETE /api/pacientes/:id            - Deletar
```

### Consultas
```
GET    /api/consultas                - Listar todas
GET    /api/consultas/:id            - Buscar por ID
POST   /api/consultas                - Agendar nova
PUT    /api/consultas/:id            - Atualizar
DELETE /api/consultas/:id            - Cancelar
```

### Prontuários
```
GET    /api/prontuarios              - Listar todos
GET    /api/prontuarios/:id          - Buscar por ID
POST   /api/prontuarios              - Criar novo
PUT    /api/prontuarios/:id          - Atualizar
DELETE /api/prontuarios/:id          - Deletar
```

### Pagamentos
```
GET    /api/pagamentos               - Listar todos
GET    /api/pagamentos/:id           - Buscar por ID
POST   /api/pagamentos               - Registrar novo
PUT    /api/pagamentos/:id           - Atualizar
DELETE /api/pagamentos/:id           - Deletar
```

---

## 🧪 Testando com cURL

```bash
# 1. Registrar usuário
curl -X POST http://localhost:5000/api/usuarios/registrar \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Dr. João",
    "email": "joao@clinica.com",
    "senha": "123456",
    "tipo_usuario": "dentista"
  }'

# 2. Fazer login
curl -X POST http://localhost:5000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@clinica.com",
    "senha": "123456"
  }'

# 3. Listar pacientes (com token)
curl -X GET http://localhost:5000/api/pacientes \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# 4. Criar paciente
curl -X POST http://localhost:5000/api/pacientes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "nome": "Maria Silva",
    "cpf": "12345678900",
    "email": "maria@email.com",
    "telefone": "11999999999",
    "endereco": "Rua A, 123"
  }'
```

---

## 📊 Banco de Dados

### Tabelas (6 entidades)

| Tabela | Campos | Descrição |
|--------|--------|-----------|
| **usuarios** | id, nome, email, senha, tipo_usuario, ativo | Usuários do sistema |
| **pacientes** | id, nome, cpf, email, telefone, endereco, data_nascimento | Dados dos pacientes |
| **dentistas** | id, usuario_id, especialidade, crm | Dentistas vinculados a usuários |
| **consultas** | id, paciente_id, dentista_id, data_consulta, status | Agenda de consultas |
| **prontuarios** | id, paciente_id, historico_medico, alergias, procedimentos | Histórico clínico |
| **pagamentos** | id, consulta_id, valor, data_pagamento, metodo_pagamento | Controle financeiro |

### Relacionamentos

```
USUÁRIOS
   ↓
DENTISTAS ←────┐
   ↑            │
   │         CONSULTAS ←────┐
   │            ↓           │
   └────── PACIENTES ─→ PRONTUÁRIOS
              ↓
          PAGAMENTOS
```

---

## 🎨 Frontend - Estrutura Modular

### Pages (5 páginas principais)
- **Dashboard**: Estatísticas e resumo geral
- **Pacientes**: Cadastro e gestão
- **Consultas**: Agenda de agendamentos
- **Prontuários**: Histórico clínico
- **Financeiro**: Controle de pagamentos

### Components (9 componentes reutilizáveis)
- Navbar de navegação
- Cards de estatísticas
- Tabelas de dados
- Modais de formulários

### Services (3 serviços)
- **api.js**: Cliente HTTP centralizado
- **auth.js**: Gerenciamento de autenticação
- **utils.js**: Funções auxiliares (formatação, validação)


---

## 👤 Autor

Repositório: https://github.com/williaxl/Clinica-camadas

