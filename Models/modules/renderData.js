export  function renderData() {

    // USER DATA
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

    const saldo = (data) => {
        let saldo = document.querySelector('#saldo')
        saldo.textContent = data
    }

    //CAPYBANK DATA

    // OUTCOMES
    const outcome = (data) => {
        let outcome = document.querySelector('#outcome')
        outcome.textContent = data
    }

    //CLIENTES 
    const select = async (user) => {
        const select = document.querySelector('select')
        const response = await fetch('http://localhost:8080/api/users')
        const database = await response.json()
        
        database.forEach((row) => {
            const option = document.createElement('option')
            if (user != row.id) {
                option.setAttribute('value', `${row.nome}`)
                option.textContent = `${row.nome}`
                select.append(option)
            }
        })
        

    }
  

    return { name , cpf, email , telefone, senha, saldo, outcome, select }
}




