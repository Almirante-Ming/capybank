// Todas as funções que interagem com o DB

const { Pool } = require('pg')

const clients = new Pool({
  host: '#',
  port: '#',
  database: '#',
  user: '#',
  password: '#',
  max: 20
})

async function createTable() {

  let isDatabaseConnected = true

  try {

    await clients.connect()

    const query = `CREATE TABLE IF NOT EXISTS dados_clientes (
      ID serial NOT NULL PRIMARY KEY UNIQUE,
      nome VARCHAR(50) NOT NULL,
      CPF VARCHAR(14) NOT NULL UNIQUE, 
      email VARCHAR(50) NOT NULL UNIQUE,
      telefone VARCHAR(14) NOT NULL UNIQUE,
      data_nascimento DATE NOT NULL,
      senha VARCHAR(25) NOT NULL
    );`

    await clients.query(query)
  }

  catch (error) {
    console.error('Erro ao adicionar tabela:', error)
    isDatabaseConnected = false
  }

  return isDatabaseConnected
}

async function createColumn(data, custom_query) {

  var data_values = []
  var outcome = 200
  var error
  
  let formCpf = String(data.cpf) 
  let formSenha = String(data.senha)
  let outcome = false
  let error
  try {
      
      await clients.connect()
      
      const query = `SELECT cpf, senha FROM dados_clientes;`
      const result = await clients.query(query)
      
      const clientData = result.rows 
      
      clientData.forEach((client) => {
          if (client.cpf == formCpf && client.senha == formSenha) { // Comparação entre dados do formulário com todos os 'nomes' e 'senhas' da tabela
              outcome = true
          }
      })
  }

  catch (err) {
    outcome = 400
    error = err
  }
  
  finally { 
      return { outcome , error }
  }
  
}

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
/*
async function updateColumn(custom_query) {

}

async function deleteColumn(custom_query) {

}
*/
  
module.exports = { createTable, createColumn, readColumn };
