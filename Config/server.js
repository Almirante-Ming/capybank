const http = require('http')

const { createTable, createColumn, readColumn } = require('./database/database')
const getBody = require('./scripts/getBody')
const getError = require('./scripts/getError')

let fetchID

const server = http.createServer( async (req, res) => {

    if (req.url.includes('Data')) {

        let body = await getBody(req).catch((err) => console.log(err)) 
        let data = JSON.parse(body)

        if (req.url == '/saveData') {
            saveData(data, res)
        }
        
        else if (req.url == '/validateData') {
            validateData(data, res)
        }
        
    }
         
    if (typeof(fetchID) == 'function' && req.url.includes('api')) {
        
        let id = fetchID()
        let query 
        
        if (req.url == '/api/users') {
            query = 'SELECT id, nome FROM dados_clientes'
        }
        else if (req.url == '/api/user') {
            query = `SELECT * FROM dados_clientes WHERE id = ${id}`
        }
        
        const database = await readColumn(query)
        const userData = database.rows[0]

        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        res.end(JSON.stringify(userData))

    }
    

})

async function saveData(data, res) {
    const operation = await createColumn(data, `INSERT INTO dados_clientes (nome, cpf, email, telefone, data_de_nascimento, senha) VALUES ($1, $2, $3, $4, $5, $6)`).catch((err) => { console.log(err) } )
    const response = operation.outcome == 400 ? getError(operation.error) : 'Cadastro concluído com sucesso!'
    res.writeHead(operation.outcome, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    res.end(JSON.stringify({
        message: response
    }))
}

async function validateData(data, res) {
    
    const database = await readColumn('SELECT id, cpf, senha FROM dados_clientes').catch((err) => { console.log(err) })
    const userData = database.rows
    let is_user_found 
    
    for (i=0; i < userData.length; i++) {
        const user = userData[i]

        if (user.cpf == data.cpf && user.senha == data.senha) {
            fetchID = () => user.id
            is_user_found = true
            break
        }

    }
    
    outcome = (is_user_found) ?  200 : 400
    const response = (is_user_found) ? '' : 'ID ou senha inválidos!'

    res.writeHead(outcome, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})

    res.end(JSON.stringify({
        message: response
    }))

    
}

createTable().then(isConnected => {

    if (!isConnected) {
        console.log('Não foi possível conectar ao banco de dados. O servidor não será iniciado. Certifique se as credenciais estão corretas.')
        return
    }

    console.log('Conexão com o banco de dados estabelecida. Tabela dados_clientes criada. Iniciando o servidor...');
    server.listen(8080, 'localhost', () => {
        console.log('Servidor rodando na porta 8080')
    })

})