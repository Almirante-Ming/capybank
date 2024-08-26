const { readColumn, updateColumn, createColumn } = require('../database/db')

async function transferCash(data, fetchID) {

    let id = fetchID()

    async function checkCPF() {
        const checkCPF = await readColumn(`SELECT cpf FROM dados_clientes where cpf = '${data.cpf}';`)
        return checkCPF
    }

    async function getUserInfo() {
        const consulta_database_1 = await readColumn(`SELECT * FROM conta WHERE cpf = '${data.cpf}';`)
        const consulta_database_2 = await readColumn(`SELECT * FROM conta WHERE cpf = '${id}';`)
        const favorecido = consulta_database_1.rows[0]
        const transferidor = consulta_database_2.rows[0]
        return { transferidor , favorecido }
    }

    async function initiateTransfer(transferidor, favorecido) {


        const valor_transferido =  favorecido.saldo + parseInt(data.valor)
        const valor_retirado = transferidor.saldo - parseInt(data.valor)

        if (valor_retirado < 0) {
            return { status: 400, message: 'Saldo não pode ficar negativo!'}
        }

        await updateColumn(`UPDATE conta SET saldo = $1 WHERE cpf = $2`, [valor_transferido, favorecido.cpf])
        await updateColumn(`UPDATE conta SET saldo = $1 WHERE cpf = $2`, [valor_retirado, transferidor.cpf])

        return { status: 200, message: 'Transferência concluída!' }
    }
    
    async function getUserNames_Extrato(transferidor, favorecido) {
        // renomear essas variaveis
        const transferUser_name = await readColumn(`SELECT nome FROM dados_clientes WHERE cpf = '${favorecido.cpf}';`)
        const loggedUser_name = await readColumn(`SELECT nome FROM dados_clientes WHERE cpf = '${transferidor.cpf}';`)
        saveExtrato(transferidor.cpf, favorecido.cpf, loggedUser_name.rows[0].nome, transferUser_name.rows[0].nome, data.valor, new Date())
    }

    async function saveExtrato(cpf_envia, cpf_recebe, nome_envia, nome_recebe, valor, data) {
        const response = await createColumn(`INSERT INTO transferencia (cpf_envia, cpf_recebe, nome_envia, nome_recebe, valor, date) VALUES ($1, $2, $3, $4, $5, $6)`, [cpf_envia, cpf_recebe, nome_envia, nome_recebe, valor, data])
        return
    }
    
    
    const validate_CPF = await checkCPF()
    if (validate_CPF.rowCount == 0) { return { outcome: 400, response : "Esse CPF não existe!"}}
    if (validate_CPF.rows[0].cpf == id) { return { outcome: 400, response: "Esse é o CPF do usuário logado!"}}

    let user = await getUserInfo()

    if (data.valor > user.transferidor.saldo) { return { outcome: 400, response: "Não há saldo suficiente para essa operação!"}}

    const transferencia = await initiateTransfer(user.transferidor, user.favorecido)

    if (transferencia.status == 200) {
        getUserNames_Extrato(user.transferidor, user.favorecido)
    }
  
    return { outcome: transferencia.status, response: transferencia.message }
    
    /*

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
    
    // Salva os dados na tabela de transferência
    if (result == 200) {
        const transferUser_name = await readColumn(`SELECT nome FROM dados_clientes WHERE cpf = '${cpf}';`)
        const loggedUser_name = await readColumn(`SELECT nome FROM dados_clientes WHERE cpf = '${id}';`)
        saveTransferHistory(id, cpf, loggedUser_name.rows[0].nome, transferUser_name.rows[0].nome, value, new Date())
    }

    return { outcome: result, response: message }
    */
   return { outcome : 200, response : 'idhissddskh'}

}


module.exports = {transferCash}