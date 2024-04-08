
// const clients = require('../database/clientes.js') -> Essa importação não funcionou e me retornou erro. Depois que o client se conecta a base de dados e fecha a conexão, ela não pode ser aberta novamente. Então instanciei uma conexão do zero como foi feito abaixo. Não consegui reutilizar o módulo que já realizava essa conexão uma vez

const { Client } = require('pg')

const clients = new Client({
    host: 'localhost',
    database: 'clientes',
    user: 'postgres',
    password: 'root'
})

const saveData = async (data) => {

    var formValues = []

    Object.keys(data).forEach((item) => {
        formValues.push(String(data[item])) // Pegando os valores do dicionário, convertendo todos para STRING e armazenando em um array
    });

    try {
        
        await clients.connect()

        const query = `
        INSERT INTO dados_clientes (nome, CPF, email, telefone, dataDeNascimento, senha)
        VALUES ($1, $2, $3, $4, $5, $6)
        `

        await clients.query(query, formValues) // Recebe a query e depois o array formValues. O indíce de cada array bate com o placeholder do query (primeiro indíce será $1, segundo indíce será $2....)

        // O array formValues está armazenando os dados do formulário em String.
    }
    
    catch(err) {
        console.log(err)
    }
    
    finally {
        await clients.end()
    }
    
}

module.exports = saveData