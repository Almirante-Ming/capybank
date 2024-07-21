
const { readColumn } = require('../database/db')

async function checkCPF(cpf, fetchID) {

    let id = fetchID()

    const database = await readColumn(`SELECT * FROM dados_clientes WHERE cpf = '${cpf}';`)
    const loggedUser = await readColumn(`SELECT cpf FROM dados_clientes WHERE id = ${id};`)

    if (database.rowCount == 0) {
        return { outcome: 400, response: "CPF não encontrado" }
    } 

    const userData = database.rows[0] 

    if (userData.cpf == loggedUser.rows[0].cpf) {
        return { outcome: 400, response: "Esse é o CPF do usuário logado"}
    }

    return { outcome: 200, response: userData.nome}

}



async function transferCash(cpf, fetchID, value) {
    
    let id = fetchID()

    const transferUser = await readColumn(`SELECT * FROM dados_clientes WHERE cpf = '${cpf}';`)
    const loggedUser = await readColumn(`SELECT * FROM dados_clientes WHERE id = ${id};`)

    return { outcome: 200, response: {transfer: transferUser.rows[0].nome, logged: loggedUser.rows[0].nome, cash: value} }

}


module.exports = {transferCash, checkCPF}