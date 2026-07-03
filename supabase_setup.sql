-- ============================================================
-- IMPERA CELL — Migração para Supabase
-- Execute este script no SQL Editor do Supabase Dashboard
-- ============================================================

-- 1. Tabela de Ordens de Serviço
CREATE TABLE IF NOT EXISTS ordens (
  id BIGINT PRIMARY KEY,
  data_entrada TEXT,
  nome_cliente TEXT NOT NULL,
  telefone TEXT,
  cpf TEXT,
  rg TEXT,
  endereco TEXT,
  bairro TEXT,
  cidade TEXT,
  email TEXT,
  tecnico TEXT,
  marca TEXT,
  modelo_aparelho TEXT,
  imei TEXT,
  imei2 TEXT,
  cor TEXT,
  acessorios TEXT,
  senha TEXT,
  senha_tipo TEXT,
  senha_seq JSONB DEFAULT '[]',
  tipo_manutencao TEXT,
  defeito_relatado TEXT,
  servico_realizado TEXT,
  observacoes TEXT,
  valor_servico NUMERIC(10,2) DEFAULT 0,
  custo_servico NUMERIC(10,2) DEFAULT 0,
  status TEXT DEFAULT 'Aguardando',
  pago BOOLEAN DEFAULT FALSE,
  forma_pagamento TEXT,
  data_pagamento TEXT,
  valor_pago NUMERIC(10,2),
  estetica JSONB DEFAULT '{}',
  defeitos JSONB DEFAULT '{}',
  checklist JSONB DEFAULT '{}',
  historico JSONB DEFAULT '[]',
  dados_extras JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela de Lançamentos Financeiros
CREATE TABLE IF NOT EXISTS lancamentos (
  id BIGINT PRIMARY KEY,
  data TEXT NOT NULL,
  descricao TEXT NOT NULL,
  categoria TEXT,
  tipo TEXT NOT NULL CHECK (tipo IN ('entrada', 'saida')),
  valor NUMERIC(10,2) NOT NULL DEFAULT 0,
  custo NUMERIC(10,2) DEFAULT 0,
  forma_pagamento TEXT,
  os_id BIGINT,
  automatico BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabela de Vendas
CREATE TABLE IF NOT EXISTS vendas (
  id BIGINT PRIMARY KEY,
  data TEXT NOT NULL,
  hora TEXT,
  descricao TEXT NOT NULL,
  preco NUMERIC(10,2) DEFAULT 0,
  quantidade INT DEFAULT 1,
  total NUMERIC(10,2) DEFAULT 0,
  forma_pagamento TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabela de Caixas (fechamento diário de vendas)
CREATE TABLE IF NOT EXISTS caixas (
  data TEXT PRIMARY KEY,
  caixa_inicial NUMERIC(10,2) DEFAULT 0,
  dados JSONB DEFAULT '{}'
);

-- 5. Tabela de Estoque
CREATE TABLE IF NOT EXISTS estoque (
  id BIGINT PRIMARY KEY,
  nome TEXT NOT NULL,
  categoria TEXT,
  qtd NUMERIC(10,2) DEFAULT 0,
  minimo NUMERIC(10,2) DEFAULT 0,
  custo NUMERIC(10,2) DEFAULT 0,
  observacoes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Tabela de Configurações (preços, modelos, renomes, etc.)
CREATE TABLE IF NOT EXISTS configuracoes (
  chave TEXT PRIMARY KEY,
  valor JSONB NOT NULL DEFAULT '{}'
);

-- 7. Sequências para auto-increment (simular nextId)
CREATE TABLE IF NOT EXISTS sequencias (
  nome TEXT PRIMARY KEY,
  valor BIGINT NOT NULL DEFAULT 1
);

-- Inserir sequências iniciais
INSERT INTO sequencias (nome, valor) VALUES
  ('ordens', 1),
  ('lancamentos', 1),
  ('vendas', 1),
  ('estoque', 1)
ON CONFLICT (nome) DO NOTHING;

-- ============================================================
-- Row Level Security (RLS) — deixar ABERTO por enquanto
-- O usuário pode habilitar auth depois se quiser
-- ============================================================
ALTER TABLE ordens ENABLE ROW LEVEL SECURITY;
ALTER TABLE lancamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendas ENABLE ROW LEVEL SECURITY;
ALTER TABLE caixas ENABLE ROW LEVEL SECURITY;
ALTER TABLE estoque ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE sequencias ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso público (anon pode tudo — trocar por auth depois)
CREATE POLICY "Acesso público ordens" ON ordens FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso público lancamentos" ON lancamentos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso público vendas" ON vendas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso público caixas" ON caixas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso público estoque" ON estoque FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso público configuracoes" ON configuracoes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso público sequencias" ON sequencias FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- Função auxiliar: atualizar updated_at automaticamente
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ordens_updated_at
  BEFORE UPDATE ON ordens
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
