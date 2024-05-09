export function renderData() {

    const name = (data) => {
        let name = document.querySelector('#name')
        name.textContent = data
    }

    const cpf = (data) => {
        let cpf = document.querySelector('#cpf')
        cpf.textContent = data
    }

    const email = (data) => {
        let email = document.querySelector('#email')
        email.textContent = data
    }

    const telefone = (data) => {
        let telefone = document.querySelector('#telefone')
        telefone.textContent = data
    }

    const senha = (data) => {
        let senha = document.querySelector('#senha')
        senha.textContent = data
    }

    return { name , cpf, email , telefone, senha }
}



