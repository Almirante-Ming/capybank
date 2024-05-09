// Todas as funções que interagem com o DB

const { Pool } = require('pg')

const clients = new Pool({
  host: 'localhost',
  database: 'clientes',
  user: 'postgres',
  password: 'root',
  max: 20
})

async function addTable() {

  let isDatabaseConnected = true

  try {
    await clients.connect();
    const query = `CREATE TABLE IF NOT EXISTS dados_clientes (
        ID serial NOT NULL,
        nome VARCHAR(50) NOT NULL,
        CPF VARCHAR(14) NOT NULL UNIQUE, 
        email VARCHAR(50) NOT NULL UNIQUE,
        telefone VARCHAR(14) NOT NULL UNIQUE,
        data_De_Nascimento DATE NOT NULL,
        senha VARCHAR(25) NOT NULL
      );`

    await clients.query(query);

  }
  catch (error) {
    console.error('Erro ao adicionar tabela:', error);
    isDatabaseConnected = false;
  } 

  return isDatabaseConnected;
}

async function saveData(data) {

  var formValues = []
  let outcome = false
  let error
  
  Object.keys(data).forEach((item) => {
    formValues.push(String(data[item])) // Pegando os valores do dicionário, convertendo todos para STRING e armazenando em um array
  });
  
  try {
      console.log(formValues)
      await clients.connect()
      const query = `
      INSERT INTO dados_clientes (nome, cpf, email, telefone, data_De_Nascimento, senha)
      VALUES ($1, $2, $3, $4, $5, $6)
      `
      var result = await clients.query(query, formValues) // Recebe a query e depois o array formValues. O indíce de cada array bate com o placeholder do query (primeiro indíce será $1, segundo indíce será $2....)
      if (result.rowCount > 0) { outcome = true }
  }
  
  catch(err) {
      console.log(err)
      error = err.detail 
  }
  
  finally {
      return { outcome, error }
  }
}

async function validateData(data) {

  let formNome = String(data.nome) 
  let formSenha = String(data.senha)

  let outcome = false 
  let id

  const validating = acessData('SELECT * FROM dados_clientes')

  await validating.then((result) => {
    
    const databaseValues = result.rows 

    databaseValues.forEach((coluna) => {
      if (coluna.nome == formNome && coluna.senha == formSenha) {
        outcome = true
        id = coluna.id
      } 
    })
    
  })

  return { outcome, id }
}

async function acessData(query) {
  let result
  try {
    await clients.connect();   
    result = await clients.query(query)
  }
  catch(err) {
  }
  finally {
    return result
  }
}

module.exports = { addTable , saveData, validateData, acessData };
