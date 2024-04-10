// Toda vez que quero abrir a base de dados, preciso instanciar nova conexão...
const { Client } = require('pg')

const clients = new Client({
    host: 'localhost',
    database: 'clientes',
    user: 'postgres',
    password: 'root'
})

const formidable = require('formidable') // Importar biblioteca que pega dados de formulário

async function validateLogin(data) {
    // Pega os dados inseridos no formulário de login e converte para string (pois quando acessados são retornados como array)
    let formNome = String(data.nome) 
    let formSenha = String(data.senha)
    
    // Booleano que verifica se encontrou dado correspondente no banco k
    let accountFound = false
    
    try {
        
        await clients.connect()

        const query = `SELECT nome, senha FROM dados_clientes;`
        const result = await clients.query(query)

        const clientData = result.rows 

        clientData.forEach((client) => {
            if (client.nome == formNome && client.senha == formSenha) { // Comparação entre dados do formulário com todos os 'nomes' e 'senhas' da tabela
                accountFound = true
            }
        })

    }
    
    catch(err) {
        console.log(err)
    }// Quando clicar no submit de login, as informações de nome e senha são extraídas e armazenadas em form. Essa informação pode ser posteriormente manipulada para consultar o banco e retornar uma saída p/ usuário.
    
    finally {
        clients.end()
    }

    return accountFound 
}

module.exports = validateLogin
