// Todas as funções que interagem com o DB

const { Pool } = require('pg')

const clients = new Pool({
  host: 'localhost',
  port: '5432',
  database: 'postgres',
  user: 'postgres',
  password: 'root',
  max: 1000
})

// Função que instancia as configurações iniciais do DB, configurando as tabelas e triggers
async function createTable() {

  let isDatabaseConnected = true

  try {

    await clients.connect()
//nunca se deve apagar as funcoes, vc faz a primeira vez pra configurar e apaga logo em seguida, ja q nao tem clausura pra ignorar
    const query = `CREATE TABLE IF NOT EXISTS dados_clientes (
                  cpf VARCHAR(14) PRIMARY KEY,
                  nome VARCHAR(255),
                  email VARCHAR(255),
                  telefone VARCHAR(50) NOT NULL UNIQUE,
                  data_nascimento DATE,
                  senha VARCHAR(255));

                  CREATE TABLE IF NOT EXISTS conta (
                    cpf VARCHAR(14) UNIQUE,
                    nome_usuario VARCHAR(255),
                    saldo FLOAT,
                    ativo BOOLEAN
                  );

                  CREATE TABLE IF NOT EXISTS transferencia (
                    cpf_envia VARCHAR(14),
                    cpf_recebe VARCHAR(14),
                    nome_envia VARCHAR(255),
                    nome_recebe VARCHAR(255),
                    valor FLOAT,
                    date TIMESTAMP);
                  
                  CREATE OR REPLACE FUNCTION criar_conta_usuario()
                    RETURNS TRIGGER AS $$
                  BEGIN
                    INSERT INTO conta (cpf, nome_usuario, saldo, ativo)
                    VALUES (NEW.cpf, NEW.nome_completo, 0.0, TRUE);
                    RETURN NEW;
                  END;
                  $$ LANGUAGE plpgsql;
                  DROP TRIGGER IF EXISTS cadastro_usuario ON dados_clientes;
                  CREATE TRIGGER cadastro_usuario
                  AFTER INSERT ON dados_clientes
                  FOR EACH ROW
                  EXECUTE FUNCTION criar_conta_usuario();
                  
                  `

    await clients.query(query)
   // clients.end()
  }

  catch (error) {
    console.error('Erro ao adicionar tabela:', error)
    isDatabaseConnected = false
  }

  return isDatabaseConnected
}

// Função para apenas retirar informação da tabela, com custom_query
async function readColumn(custom_query) {

  let result

  try {
    await clients.connect()
    result = await clients.query(custom_query)
    // clients.end()
  }

  catch (err) {
    console.log(err)
  }

  finally {
    return result
  }

}

// Função para mudar informação da tabela, com custom_query e recebendo dados armazenados em ARRAY, retorna um resultado de operação
async function updateColumn(custom_query, data) {
    let outcome = 400
    let error
    try {
      await clients.connect()
      let result = await clients.query(custom_query, data)
      if (result.rowCount > 0) { outcome = 200 }
      // clients.end()
      
    }
    catch(err) {
      error = err
      console.log(err)
    }
    finally {
      return { outcome, error }
    }
}


module.exports = { createTable , readColumn, updateColumn };
