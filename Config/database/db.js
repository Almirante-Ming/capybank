// Todas as funções que interagem com o DB

const { Pool } = require('pg')

const clients = new Pool({
  host: 'localhost',
  port: '5432',
  database: 'clientes',
  user: 'postgres',
  password: 'root',
  max: 100
})

async function createTable() {

  let isDatabaseConnected = true

  try {

    await clients.connect()

    // MUDANÇA AQUI:

    // ALteração da query inicial pra criar o dados_clientes, conta e transferencia e ativar o trigger de criação de conta.
      // --- COLOQUEI "500" NO SALDO NO TRIGGER ABAIXO, PARA FINS DE TESTE
    const query = `CREATE TABLE IF NOT EXISTS dados_clientes (
      cpf VARCHAR(14) UNIQUE PRIMARY KEY,
      nome VARCHAR(255),
      email VARCHAR(255),
      telefone VARCHAR(50) NOT NULL UNIQUE,
      data_nascimento DATE,
      senha VARCHAR(255)
    );
    
    CREATE TABLE IF NOT EXISTS conta (
      cpf VARCHAR(14) UNIQUE PRIMARY KEY,
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

    DROP FUNCTION IF EXISTS criar_conta_usuario() CASCADE;

    CREATE OR REPLACE FUNCTION criar_conta_usuario()
    RETURNS TRIGGER AS $$
    BEGIN
      INSERT INTO conta (cpf, nome_usuario, saldo, ativo)
      VALUES (NEW.cpf, NEW.nome, 500, TRUE);
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER cadastro_usuario
    AFTER INSERT ON dados_clientes
    FOR EACH ROW
    EXECUTE FUNCTION criar_conta_usuario();
    `

    await clients.query(query)
  }

  catch (error) {
    console.error('Erro ao adicionar tabela:', error)
    isDatabaseConnected = false
  }

  return isDatabaseConnected
}

// CREATE: Essa função de objetivo de criar alguma coluna dentro de uma tabela, recebendo como parâmetro:
// 1. Dados que serão salvos na tabela
// 2. A query customizada para salvar na tabela
async function createColumn(data, custom_query) {

  var outcome = 400
  var error

  try {
    await clients.connect()
    const result = await clients.query(custom_query, [data.nome, data.cpf, data.email, data.telefone, data.data_nascimento, data.senha])
    if (result.rowCount > 0) { outcome = 200 }
  }
  catch (err) {
    console.log(err)
    error = err
  }
  finally {
    return { outcome, error }
  }

}

// READ: Essa função tem objetivo de ler os dados da coluna, utilizado no projeto para:
// 1. Capturar dados extraídos do banco e renderizá-los na DOM
async function readColumn(custom_query) {

  let result

  try {
    await clients.connect();
    result = await clients.query(custom_query)
  }

  catch (err) {
    console.log(err)
  }

  finally {
    return result
  }

}

async function updateColumn(custom_query, data) {
  let outcome = 400
  let error
  try {
    await clients.connect()
    let result = await clients.query(custom_query, data)
    if (result.rowCount > 0) { outcome = 200 }

  }
  catch (err) {
    error = err
    console.log(err)
  }
  finally {
    return { outcome, error }
  }
}


module.exports = { createTable, createColumn, readColumn, updateColumn };
