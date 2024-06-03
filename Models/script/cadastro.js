import { renderData } from '../modules/renderData.js'
import { DataFormatter } from '../modules/DataFormatter.js'
// Relação entre o ID dos inputs e a posição deles no array de .Inputs 

const input_relation = [
    { id: "nome", position: 0, minimum: 3, requiredString: [], mustMatch: null, regex: /(\w)\1{2,}/ },
    { id: "cpf", position: 1, minimum: 14, requiredString: [], mustMatch: null, regex: null},
    { id: "email", position: 2, minimum: 3, requiredString: [".com", "@"], mustMatch: null, regex: null },
    { id: "telefone", position: 3, minimum: 14, requiredString: [], mustMatch: null, regex: null },
    { id: "data_nascimento", position: 4, minimum: 10, requiredString: [], mustMatch: null, regex: null },
    { id: "senha", position: 5, minimum: 6, requiredString: [], mustMatch: 'confirmar-senha', regex: null },
    { id: "confirmar-senha", position: 6, minimum: 6, requiredString: [], mustMatch: 'senha', regex: null }
]

// Função principal
function validateForm() {

    const Inputs = document.querySelectorAll('.Input')
    const submit = document.querySelector('#submit')
    const bx = document.querySelectorAll('.bx')

    const format = DataFormatter()
    toggleSubmit(submit, Inputs)
    
    Inputs.forEach((box) => {

        const input = box.firstElementChild 
        // Verifica erros em todos os inputs
        input.addEventListener('input', (e) => {
            checkRelation(input)
            toggleSubmit(submit, Inputs)
            if (input.id == 'cpf') { format.CPF(e) }
            if (input.id == 'telefone') { format.phone(e) }
        })

        input.addEventListener('blur', () => {
            checkRelation(input)
            toggleSubmit(submit, Inputs)
        })

        input.addEventListener('focus', () => {
            checkRelation(input)            
            toggleSubmit(submit, Inputs)
        })

        bx.forEach((check) => {
            check.addEventListener('click', () => {
                check.classList.toggle('show')
                let showPassword = (input.type == 'password' ? 'text' : 'password')
                if (input.id == 'senha' && check.id == 'p1') { input.type = showPassword }
                if (input.id == 'confirmar-senha' && check.id == 'p2') { input.type = showPassword }
            })
        })
    
    })

    submit.addEventListener('click', (e) => {
        e.preventDefault()
        const form = document.querySelector('form')
        sendFormData(form)
    })

}

// Procura se o input digitado bate com algum da relação
function checkRelation(input) {
    input_relation.forEach((relation) => {
        if (relation.id == input.id) {
            lookForErrors(relation, input)
        }
    })
}

// Procura os erros com base na relação
function lookForErrors(relation, input) {

    const box = input.parentElement
    const errorPanel = errorController()
    const matchingInput = document.querySelector(`#${relation.mustMatch}`)

    if (input.value.length < relation.minimum) {
        errorPanel.showError(box, relation, `${input.id} precisa ter no mínimo ${relation.minimum} caracteres!`)
    }

    else if (!relation.requiredString.every(str => input.value.includes(str))) {
        errorPanel.showError(box, relation, `${input.id} precisa incluir ${relation.requiredString.join(" ou ")} em seu corpo!`)
    }

    else if (relation.mustMatch && matchingInput.value !== input.value) {
        errorPanel.showError(box, relation, `Os campos de senha não coincidem!`)
    }

    else if (relation.regex !== null && relation.regex.test(input.value)) {
        errorPanel.showError(box, relation, `Campo não pode possuir caracteres consecutivos!`)
    }

    else {
        errorPanel.hideError(box, relation)
    }
}

// Painel de erro, exibe a mensagem e deixa o campo inválido. Também esconde o erro
function errorController() {

    const message = document.querySelectorAll('.Error-Message')

    const showError = (box, relation, msg) => {
        message[relation.position].textContent = msg
        box.classList.add('Invalid')
    }

    const hideError = (box, relation) => {
        message[relation.position].textContent = ''
        box.classList.remove('Invalid')
    }

    return { showError, hideError }
}

// Ativa e desativa o submit com base na validação dos inputs && se todos estão preenchidos
function toggleSubmit(submit, Inputs) {

    submit.disabled = true
    var emptyInputs = 0
    var InvalidInputs = 0

    // Procura algum input vazio ou inválido 
    Inputs.forEach((box) => {
        const input = box.firstElementChild
        if (input.value.length == 0) {
            emptyInputs += 1
        }
        if (box.className.includes('Invalid')) {
            InvalidInputs += 1
        }
    })

    // Ativa o botão se todos os inputs estiverem preenchidos e válidos
    if (emptyInputs == 0 && InvalidInputs == 0) { submit.disabled = false }
}

// Envia as informações para servidor
function sendFormData(form) {

    const render = renderData()
    let formData = new FormData(form)

    let userData = {
        'nome': formData.get('nome'),
        'cpf': formData.get('cpf'),
        'email': formData.get('email'),
        'telefone': formData.get('telefone'),
        'data_nascimento': formData.get('data_nascimento'),
        'senha': formData.get('senha'),
    }

    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(userData)
    }

    fetch('http://localhost:8080/saveData', requestOptions).then(async (response) => {
        const result = await response.json()
        render.outcome(result.message)
        form.reset()
    })

}

document.addEventListener('DOMContentLoaded', validateForm)
