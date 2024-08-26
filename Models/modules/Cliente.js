
// Aqui é realizado o FETCH para extrair informações do banco e renderizar na DOM.
    // Por conveniência, esses dados são armazenados como atributos de um objeto e são repassados para
    // uma função auxiliar (no script renderData.js) que recebe esses dados e renderiza eles nos campos.


export class Cliente {
    constructor (nome, cpf, email, telefone, senha, nasc, saldo, status) {
        this.nome = nome
        this.__cpf = cpf
        this.__email = email
        this.__telefone = telefone
        this.__senha = senha
        this.nasc = nasc
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

        return new Cliente(user.nome, user.cpf, user.email, user.telefone, user.senha, user.data_nascimento, conta.saldo, conta.status)
    
    }

    const userData = await getUser()
    return userData 
}


