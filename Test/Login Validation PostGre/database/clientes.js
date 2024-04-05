const { Client } = require('pg')

const clients = new Client({
    host: 'localhost',
    database: 'clientes',
    user: 'postgres',
    password: 'root'
})

async function addTable() {
  
    try {  
      await clients.connect();
  
      const query = `
        CREATE TABLE IF NOT EXISTS dados_clientes (
        nome VARCHAR(100),
        CPF VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        telefone VARCHAR(100),
        dataDeNascimento DATE,
        senha VARCHAR(100)
        ); `;

      
      await clients.query(query);
      console.log('Coluna criada com sucesso');     
    
    } 
    
    catch (error) {
      console.error('Erro ao adicionar coluna:', error);
    } 
    
    finally {
      await clients.end();
    }

}

addTable()
module.exports = clients