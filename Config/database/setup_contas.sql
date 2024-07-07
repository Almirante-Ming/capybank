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
  cpf_envia VARCHAR(14),
  valor_anterior FLOAT,
  valor_pos_transferencia FLOAT,
  cpf_recebe VARCHAR(14),
  saldo_anterior FLOAT,
  saldo_pos_transferencia FLOAT,
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




-- --regras para transferencia
-- CREATE OR REPLACE FUNCTION log_transferencia(
--     cpf_remetente VARCHAR(14),
--     cpf_destinatario VARCHAR(14),
--     valor FLOAT
-- ) RETURNS VOID AS $$
-- DECLARE
--     saldo_atual_sender FLOAT;
--     saldo_atual_receiver FLOAT;
-- BEGIN
--     -- Limpar o CPF remetente e destinatário para remover caracteres não numéricos
--     cpf_remetente := regexp_replace(cpf_remetente, '[^\d]', '', 'g');
--     cpf_destinatario := regexp_replace(cpf_destinatario, '[^\d]', '', 'g');

--     -- Verifica se existem remetente e destinatário
--     IF NOT EXISTS (SELECT 1 FROM conta WHERE cpf = cpf_remetente) THEN
--         RAISE EXCEPTION 'CPF de remetente não encontrado';
--     END IF;

--     IF NOT EXISTS (SELECT 1 FROM conta WHERE cpf = cpf_destinatario) THEN
--         RAISE EXCEPTION 'CPF de destinatário não encontrado';
--     END IF;

--     -- Obtém o saldo atual do remetente e do destinatário
--     SELECT saldo INTO saldo_atual_sender
--     FROM conta
--     WHERE cpf = cpf_remetente;

--     SELECT saldo INTO saldo_atual_receiver
--     FROM conta
--     WHERE cpf = cpf_destinatario;

--     -- Inicia a transação explícita
--     BEGIN
--         -- Verifica se o saldo transferido não é maior do que o saldo atual do remetente
--         IF valor > saldo_atual_sender THEN
--             RAISE EXCEPTION 'Saldo insuficiente para realizar a transferência';
--         END IF;

--         -- Insere uma nova entrada na tabela de transferencia
--         INSERT INTO transferencia (
--             cpf_envia, 
--             valor_anterior, 
--             valor_pos_transferencia, 
--             cpf_recebe, 
--             saldo_anterior, 
--             saldo_pos_transferencia, 
--             transfer_date
--         ) VALUES (
--             cpf_remetente, 
--             saldo_atual_sender, 
--             valor, 
--             cpf_destinatario, 
--             saldo_atual_receiver, 
--             saldo_atual_receiver + valor, 
--             NOW()
--         );

--         -- Atualiza o saldo do remetente
--         UPDATE conta
--         SET saldo = saldo_atual_sender - valor
--         WHERE cpf = cpf_remetente;

--         -- Atualiza o saldo do destinatário
--         UPDATE conta
--         SET saldo = saldo_atual_receiver + valor
--         WHERE cpf = cpf_destinatario;

--         -- Confirma a transação explícita
--         COMMIT;
--     EXCEPTION
--         WHEN OTHERS THEN
--             -- Em caso de erro, faz rollback da transação explícita
--             ROLLBACK;
--             RAISE;
--     END;
-- END;
-- $$ LANGUAGE plpgsql;