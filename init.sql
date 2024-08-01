CREATE TABLE IF NOT EXISTS dados_clientes (
  cpf VARCHAR(14) PRIMARY KEY,
  nome_completo VARCHAR(255),
  email VARCHAR(255),
  telefone VARCHAR(50) NOT NULL UNIQUE,
  data_de_nascimento DATE,
  senha VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS conta (
  cpf VARCHAR(14) UNIQUE,
  nome_usuario VARCHAR(255),
  saldo FLOAT,
  ativo BOOLEAN
);

CREATE TABLE IF NOT EXISTS transferencia (
  cpf_envia VARCHAR(14),
  valor_anterior FLOAT,
  valor_pos_transferencia FLOAT,
  cpf_recebe VARCHAR(14),
  saldo_anterior FLOAT,
  saldo_pos_transferencia FLOAT,
  date TIMESTAMP
);
CREATE OR REPLACE FUNCTION criar_conta_usuario()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO conta (cpf, nome_usuario, saldo, ativo)
    VALUES (NEW.cpf, NEW.nome_completo, 0.0, TRUE);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cadastro_usuario
AFTER INSERT ON dados_clientes
FOR EACH ROW
EXECUTE FUNCTION criar_conta_usuario();

INSERT INTO dados_clientes (cpf, nome_completo, email, telefone, data_de_nascimento, senha)
VALUES 
('111.111.111-11', 'saque', 'saque@conta.saque', '(11) 1111-1111', '2000-01-01', '111111'),
('999.999.999-99', 'deposito', 'deposito@conta.deposito', '(99) 9999-9999', '1999-09-09', '999999');

UPDATE conta
SET nome_usuario='deposito', saldo=999999999, ativo=true
WHERE cpf='999.999.999-99';

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