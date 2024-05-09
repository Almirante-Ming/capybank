import { getUserData } from '../modules/Cliente.js'
import { renderData } from '../modules/renderUserData.js'

async function DOMInteraction() {
    
    const user = await getUserData()
    const renderUser = renderData()

    renderUser.name(user.nome)
    
}

document.addEventListener('DOMContentLoaded', DOMInteraction)
/*
class Cliente {
    constructor (nome, cpf, email, telefone, senha) {
        this.nome = nome
        this.cpf = cpf
        this.email = email
        this.telefone = telefone
        this.senha
    }
}

function renderData() {

    const name = (data) => {
        let name = document.querySelector('#name')
        name.textContent = data
    }

    return { name }
}

async function getUserData() {

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

async function DOMInteraction() {
    
    const cliente = await getUserData()
    const renderUser = renderData()

    renderUser.name(cliente.nome)

}


*/
/*
document.addEventListener('DOMContentLoaded', () => {
    async function response() {
        const response = await fetch('http://localhost:8080/api/users')
        .then(response => {
            // Verifica se a resposta foi bem-sucedida
           
            // Retorna os dados da resposta como JSON
            console.log(response.json());
        })
    }
    response()
})
*/