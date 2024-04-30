const { Pool } = require('pg')

const clients = new Pool({
    host: 'localhost',
    port: 5433,
    database: 'postgres',
    user: 'postgres',
    password: 'postgres',
    max: 20 /**/
})

async function saveData(data) {

    var formValues = []
    let dataSaved = false
    
    Object.keys(data).forEach((item) => {
        formValues.push(String(data[item])) // Pegando os valores do dicionário, convertendo todos para STRING e armazenando em um array
    });
    
    try {
        await clients.connect()
        
        const query = `
        INSERT INTO dados_clientes (nome, CPF, email, telefone, dataDeNascimento, senha)
        VALUES ($1, $2, $3, $4, $5, $6)
        `
        var result = await clients.query(query, formValues) // Recebe a query e depois o array formValues. O indíce de cada array bate com o placeholder do query (primeiro indíce será $1, segundo indíce será $2....)
        if (result.rowCount > 0) { dataSaved = true }
    }
    
    catch(err) {
        console.log(err)
    }
    
    finally {
        return dataSaved
    }

}

module.exports = saveData