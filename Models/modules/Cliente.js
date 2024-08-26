
// Aqui é realizado o FETCH para extrair informações do banco e renderizar na DOM.
    // Por conveniência, esses dados são armazenados como atributos de um objeto e são repassados para
    // uma função auxiliar (no script renderData.js) que recebe esses dados e renderiza eles nos campos.

import { formatDate } from "./formDealer.js"

export class Cliente {
    constructor (nome, cpf, email, telefone, senha, data_nascimento, saldo, status) {
        this.nome = nome
        this.__cpf = cpf
        this.__email = email
        this.__telefone = telefone
        this.__senha = senha
        this.data_nascimento = data_nascimento
        this.saldo = saldo
        this.status = status
    }
}

export async function getUserData() {

    async function getUser() {
        
        const database_fetch = await fetch('http://localhost:8080/api/user')
        const database_fetch_2 = await fetch('http://localhost:8080/api/conta')
        
        const user = await database_fetch.json()
        const conta = await database_fetch_2.json()
        user[0].data_nascimento = formatDate(user[0].data_nascimento)

        return new Cliente(user[0].nome, user[0].cpf, user[0].email, user[0].telefone, user[0].senha, user[0].data_nascimento, conta[0].saldo, conta[0].status)
    
    }

    const userData = await getUser()
    return userData 
}





