const { readColumn, updateColumn, createColumn } = require('../database/db')

async function checkCPF(cpf, fetchID) {

    let id = fetchID()

    const database = await readColumn(`SELECT * FROM dados_clientes WHERE cpf = '${cpf}';`)
    const loggedUser = await readColumn(`SELECT cpf FROM dados_clientes WHERE cpf = '${id}';`)

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

    const transferUser = await readColumn(`SELECT * FROM conta WHERE cpf = '${cpf}';`)
    const loggedUser = await readColumn(`SELECT * FROM conta WHERE cpf = '${id}';`)

    if (value > loggedUser.rows[0].saldo) {
        return {outcome: 400, response: "Erro! Não há saldo disponível para essa operação!"}
    }

    // Parte que são realizadas as operações básicas de transferência, para o usuário logado e 'beneficiário'
    const valor_anterior1 = transferUser.rows[0].saldo
    const valor_anterior2 = loggedUser.rows[0].saldo 
 
    const valor_transferido = valor_anterior1 + parseInt(value)
    const valor_retirado =  valor_anterior2 - parseInt(value)

    // Variável para capturar status de erro e mensagem customizada
    let result 

    if (valor_transferido < 0 || valor_retirado < 0) {
        return {outcome: 400, response: 'Saldo não pode ficar negativo!'}
    }

    // Update do Banco de dados nos dois trechos abaixo, para os dois envolvidos na transferência
    await updateColumn(`UPDATE conta SET saldo = $1 WHERE cpf = $2`, [valor_transferido, transferUser.rows[0].cpf]).catch((err) => { result = 400 })
    await updateColumn(`UPDATE conta SET saldo = $1 WHERE cpf = $2`, [valor_retirado, loggedUser.rows[0].cpf]).catch((err) => { result = 400 })

    result = 200

    let message = result == 200 ? 'Transferência realizada com sucesso!' : 'Não foi possível realizar transferência!'
    

    return { outcome: result, response: message }

}

function saveTransferHistory() {
    
}

module.exports = {transferCash, checkCPF}