CREATE TABLE usuario (
  cpf VARCHAR(14) UNIQUE PRIMARY KEY,
  nome_completo VARCHAR(255),
  email VARCHAR(255),
  telefone INT,
  data_de_nascimento DATE,
  senha VARCHAR(255)
);

CREATE TABLE conta (
  cpf VARCHAR(14) UNIQUE PRIMARY KEY,
  nome_usuario VARCHAR(255),
  saldo FLOAT,
  ativo BOOLEAN
);

CREATE TABLE transferencia (
  id SERIAL PRIMARY KEY,
  cpf VARCHAR(14),
  valor_disponivel FLOAT,
  valor_transferido FLOAT,
  saldo_user_envio FLOAT,
  saldo_user_transferido FLOAT
  date TIMESTAMP
);

-- --tabela com a movimentacao mais recente para exibir na dashboard
-- CREATE TABLE rece_mov (
--   envio_cpf VARCHAR(14),
--   valor FLOAT,
--   destino_cpf VARCHAR(14),
--   date DATE
-- );

-- Criação da função e trigger para criação automática de conta
CREATE OR REPLACE FUNCTION criar_conta_usuario()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO conta (cpf, nome_usuario, saldo, ativo)
    VALUES (NEW.cpf, NEW.nome_completo, 0.0, TRUE);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cadastro_usuario
AFTER INSERT ON usuario
FOR EACH ROW
EXECUTE FUNCTION criar_conta_usuario();

-- Agentes  de saque e deposito, para servir de destino ou origem dos valores.
INSERT INTO usuario (cpf, nome_completo, email, telefone, data_de_nascimento, senha)
VALUES 
('111.111.111-11', 'saque', 'saque@conta.saque', 111111111, '2000-01-01', '111111'),
('999.999.999-99', 'deposito', 'deposito@conta.deposito', 999999999, '1999-09-09', '999999');

UPDATE conta
SET nome_usuario='deposito', saldo=999999999, ativo=true
WHERE cpf='999.999.999-99';

--funcao void do saque, para nao estourar o limite do campo
CREATE OR REPLACE FUNCTION saque_limpar()
RETURNS void AS $$
DECLARE
    limite FLOAT := 5000; 
    conta_saque VARCHAR(14) := '111.111.111-11';
BEGIN
    IF (SELECT saldo FROM conta WHERE cpf = conta_saque) >= limite THEN
        UPDATE conta
        SET saldo = 0
        WHERE cpf = conta_saque;
    END IF;
END;
$$ LANGUAGE plpgsql;
