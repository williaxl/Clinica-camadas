-- Criar banco de dados
CREATE DATABASE clinica_db;

-- Conectar ao banco de dados
\c clinica_db;

-- Tabela de Usuários
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  tipo_usuario VARCHAR(50) NOT NULL CHECK (tipo_usuario IN ('dentista', 'secretaria')),
  ativo BOOLEAN DEFAULT true,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Pacientes
CREATE TABLE pacientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  cpf VARCHAR(11) UNIQUE,
  data_nascimento DATE,
  telefone VARCHAR(20),
  endereco VARCHAR(255),
  email VARCHAR(150),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Dentistas
CREATE TABLE dentistas (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL UNIQUE,
  especialidade VARCHAR(100),
  crm VARCHAR(50) UNIQUE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela de Consultas
CREATE TABLE consultas (
  id SERIAL PRIMARY KEY,
  paciente_id INTEGER NOT NULL,
  dentista_id INTEGER NOT NULL,
  data_consulta DATE NOT NULL,
  hora_consulta TIME NOT NULL,
  status VARCHAR(50) DEFAULT 'agendada' CHECK (status IN ('agendada', 'realizada', 'cancelada')),
  observacoes TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
  FOREIGN KEY (dentista_id) REFERENCES dentistas(id) ON DELETE CASCADE,
  UNIQUE(dentista_id, data_consulta, hora_consulta)
);

-- Tabela de Prontuários
CREATE TABLE prontuarios (
  id SERIAL PRIMARY KEY,
  paciente_id INTEGER NOT NULL UNIQUE,
  historico_tratamentos TEXT,
  evolucoes TEXT,
  alergias TEXT,
  observacoes TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);

-- Tabela de Pagamentos
CREATE TABLE pagamentos (
  id SERIAL PRIMARY KEY,
  consulta_id INTEGER NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  data_pagamento DATE NOT NULL,
  status_pagamento VARCHAR(50) DEFAULT 'pendente' CHECK (status_pagamento IN ('pendente', 'pago', 'cancelado')),
  metodo_pagamento VARCHAR(50) CHECK (metodo_pagamento IN ('dinheiro', 'cartao', 'transferencia', 'cheque')),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (consulta_id) REFERENCES consultas(id) ON DELETE CASCADE
);

-- Criar índices para melhorar performance
CREATE INDEX idx_pacientes_cpf ON pacientes(cpf);
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_consultas_paciente ON consultas(paciente_id);
CREATE INDEX idx_consultas_dentista ON consultas(dentista_id);
CREATE INDEX idx_consultas_data ON consultas(data_consulta);
CREATE INDEX idx_pagamentos_consulta ON pagamentos(consulta_id);
CREATE INDEX idx_pagamentos_status ON pagamentos(status_pagamento);
