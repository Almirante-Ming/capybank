// Toda vez que quero abrir a base de dados, preciso instanciar nova conexão...
const { Pool } = require('pg')
const formidable = require('formidable') // Importar biblioteca que pega dados de formulário

const clients = new Pool({
    host: 'localhost',
    database: 'clientes',
    user: 'postgres',
    password: 'root',
    max: 20 /**/
})

async function validateData(data) {

    let formNome = String(data.nome) 
    let formSenha = String(data.senha)
    let outcome = false
    let error

    try {
        
        await clients.connect()
        
        const query = `SELECT nome, senha FROM dados_clientes;`
        const result = await clients.query(query)
        
        const clientData = result.rows 
        
        clientData.forEach((client) => {
            if (client.nome == formNome && client.senha == formSenha) { // Comparação entre dados do formulário com todos os 'nomes' e 'senhas' da tabela
                outcome = true
            }
        })
    
    }
    
    catch(err) {
        error = err.details
    }
    
    finally {
        return { outcome , error }
    }
    
}

module.exports = validateData
 