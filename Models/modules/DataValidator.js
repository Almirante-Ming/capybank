// VALIDA O FORMULÁRIO

export function DataValidator() {

    const checkRelation = (input, relation) => {
        relation.forEach((relation) => {
            if (relation.id == input.id) {
                lookForErrors(relation, input)
            }
        })
    }

    const toggleSubmit = (submit, Inputs) => {

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

    return { checkRelation, toggleSubmit }
}



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



