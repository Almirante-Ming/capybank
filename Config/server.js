const http = require('http')

const { createTable, createColumn, readColumn } = require('./database/database')
const getBody = require('./scripts/getBody')

let fetchID

const server = http.createServer((req, res) => {
    // Esse bloco realiza operação e volta status 200 ou 400 para API
    if (req.url.includes('Data')) {

        let body = getBody(req).then((body) => {
            let data = body
            data = JSON.parse(data)

            if (req.url == '/api/saveData') {
                const operation = createColumn(data, `INSERT INTO dados_clientes (nome, cpf, email, telefone, data_nascimento, senha) VALUES ($1, $2, $3, $4, $5, $6)`)
                operation.then((response) => {
                    res.writeHead(response.outcome, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
                    res.end()
                })
            }

            if (req.url == '/api/validateData') {
                const database = readColumn('SELECT * FROM dados_clientes')
                let outcome = 400

                database.then((db) => {
                    let userData = db.rows
                    userData.forEach((user) => {
                        if (data.cpf == user.cpf && data.senha == user.senha) {
                            outcome = 200
                            fetchID = () => user.id
                        }
                    })

                    res.writeHead(outcome, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
                    res.end()
                })
            }

        })



    }

    // Esse bloco pega o ID do usuário autenticado e manda para API.
    if (typeof(fetchID) == 'function' && req.url.includes('user')) {
        
        let id = fetchID()
        const query = req.url == '/api/users' ? 'SELECT id, nome FROM dados_clientes' :  `SELECT * FROM dados_clientes WHERE id = ${id}`
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        
        const database = readColumn(query).then((db) => {
            const userData = db.rows
            res.end(JSON.stringify(userData))
        })

    }
   
})

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