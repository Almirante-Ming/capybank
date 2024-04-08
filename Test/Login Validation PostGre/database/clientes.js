const { Client } = require('pg');

// Antes de iniciar o teste, certificar que todas as informações de conexão estão de acordo. Criar a base de dados antes.
const clients = new Client({
    host: 'localhost',
    database: 'clientes',
    user: 'postgres',
    password: 'root'
});

async function addTable() {

    let isDatabaseConnected = true
    
    try {
      await clients.connect();
      const query = `CREATE TABLE IF NOT EXISTS dados_clientes (
        nome VARCHAR(100),
        CPF VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        telefone VARCHAR(100),
        dataDeNascimento DATE,
        senha VARCHAR(100)
      );`

      await clients.query(query);

    } 
    catch (error) {
        console.error('Erro ao adicionar tabela:', error);
        isDatabaseConnected = false;
    } finally {
        await clients.end();
    }

    return isDatabaseConnected;
}

module.exports = { addTable };
