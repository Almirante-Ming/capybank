export  function renderData() {

    // USER DATA
    const name = (data) => {
        let name = document.querySelector('#name')
        name.textContent = data
        name.value = data
    }

    const cpf = (data) => {
        let cpf = document.querySelector('#cpf')
        cpf.textContent = data
        cpf.value = data
    }

    const email = (data) => {
        let email = document.querySelector('#email')
        email.textContent = data
        email.value = data
    }

    const telefone = (data) => {
        let telefone = document.querySelector('#telefone')
        telefone.textContent = data
        telefone.value = data
    }

    const senha = (data) => {
        let senha = document.querySelector('#senha')
        senha.textContent = data
        senha.value = data
    }

    const nasc = (data) => {
        let nasc = document.querySelector('#nasc')
        nasc.textContent = data 
        nasc.value = data
    }

    const saldo = (data) => {
        let saldo = document.querySelector('#saldo')
        saldo.textContent = data
    }
    
    //CAPYBANK DATA

    // OUTCOMES
    const outcome = (data) => {
        let outcome = document.querySelector('#outcome')
        toggleActiveClass(outcome)
        outcome.textContent = data
    }

    

  
    return { name , cpf, email , telefone, senha, saldo, nasc, outcome }
}



function toggleActiveClass(outcome) {
    if (outcome.classList.contains('Active')) {
      outcome.classList.remove('Active')
      void outcome.offsetWidth
    }
    outcome.classList.add('Active')
  }
