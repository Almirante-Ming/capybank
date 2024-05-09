export class Cliente {
    constructor (nome, cpf, email, telefone, senha) {
        this.nome = nome
        this.cpf = cpf
        this.email = email
        this.telefone = telefone
        this.senha
    }
}

export async function getUserData() {

    async function getID() {
        const response = await fetch('http://localhost:8080/dashboard.html')
        const userID = await response.headers.get('Custom-Message');
        const cliente = await getUser(userID)
        return cliente
    }

    async function getUser(userID) {
        
        const response = await fetch('http://localhost:8080/api/users')
        const database = await response.json()
        for (const user of database) {
            if (user.id == userID) {
                return new Cliente(user.nome, user.cpf, user.email, user.telefone, user.senha)
            }
        }
           
    }

    const userData = await getID()
    return userData
}