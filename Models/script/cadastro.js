import { renderData } from '../modules/renderData.js'

function validateForm(e) {

    const form = document.querySelector('form')
    const bx = document.querySelectorAll('.bx')
    const inputs = document.querySelectorAll('input')
    const inputBox = document.querySelectorAll('.Input')

    inputs.forEach((input) => {

        input.addEventListener('input', (e) => {
            checkErrors(input)
            if (input.id == 'cpf') { cpfMaskOnInput(e) }
            if (input.id == 'telefone') { /*phoneMaskOnInput(e) */ }
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

    // Procura algum input inválido antes de enviar ao banco
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let invalidInputs
        inputs.forEach((input) => {
            checkErrors(input)
            invalidInputs = checkInputs(inputBox)
        })
        if (invalidInputs == 0) { sendFormData(form) }
    })

}

function checkInputs(inputBox) {
    let counter = 0
    inputBox.forEach((box) => {
        if (box.className.includes('Invalid')) {
            counter ++
        } 
    })
    return counter
}

function checkErrors(input) {

    const checking = errorOutput(input)
    // Campo 0
    if (input.id == 'nome') {
        checking.isLengthSmallerThan(5, 0)
    }
    // Campo 1
    if (input.id == 'cpf') {
        checking.isLengthSmallerThan(14, 1)
    }
    // Campo 2
    if (input.id == 'email') {
        checking.isWordMissing('.com', 2)
    }
    // Campo 3
    if (input.id == 'telefone') {
        checking.isLengthSmallerThan('11', 3)
    }
    //Campo 4
    if (input.id == 'data') {
        checking.isEmpty(4)
    }
    // Campo 5
    if (input.id == 'senha') {
        checking.isLengthSmallerThan('6', 5)
    }
    // Campo 6
    if (input.id == 'confirmar-senha') {
        let password = document.querySelector('#senha')
        checking.arePasswordsMatching(password.value, input.value, 6)
    }

}

function errorOutput(input) {

    const errorMessage = document.querySelectorAll('.Error-Message')
    const errorSign = document.querySelectorAll('.Error-Sign')
    const inputBox = document.querySelectorAll('.Input')

    const isLengthSmallerThan = (value, index) => {
        if (input.value.length < value) {
            showMessage(inputBox[index], errorSign[index], errorMessage[index], `${input.id} precisa ter mais que ${value} caracteres!`)
        }
        else {
            hideMessage(inputBox[index], errorSign[index], errorMessage[index], '')
        }
    }

    const isWordMissing = (string, index) => {
        if (!(input.value.includes(string))) {
            showMessage(inputBox[index], errorSign[index], errorMessage[index], `${input.id} precisa incluir ${string} em seu corpo`)
        }
        else {
            hideMessage(inputBox[index], errorSign[index], errorMessage[index], '')
        }
    }

    const arePasswordsMatching = (p1, p2, index) => {
        if (p1 != p2) {
            showMessage(inputBox[index], errorSign[index], errorMessage[index], `Os campos de senha não coincidem!`)
        }
        else {
            hideMessage(inputBox[index], errorSign[index], errorMessage[index], '')
        }
    }

    const isEmpty = (index) => {
        if (input.value.length == 0) {
            showMessage(inputBox[index], errorSign[index], errorMessage[index], `O campo não pode ficar vazio!`)
        }
        else {
            hideMessage(inputBox[index], errorSign[index], errorMessage[index], '')
        }
    }
    return { isLengthSmallerThan, isWordMissing, arePasswordsMatching, isEmpty }
}

function showMessage(inputBox, errorSign, errorMessage, text) {
    inputBox.classList.add('Invalid')
    errorSign.style.display = 'block'
    errorMessage.style.display = 'block'
    errorMessage.textContent = text
}

function hideMessage(inputBox, errorSign, errorMessage, text) {
    inputBox.classList.remove('Invalid')
    inputBox.style.border = '1px solid black'
    errorSign.style.display = 'none'
    errorMessage.style.display = 'none'
    errorMessage.textContent = text
}

function cpfMaskOnInput(event) {

    var value = event.target.value;
    var caret = event.target.selectionStart;
    var previousValue = event.target.previousValue;

    if (value + "-" === previousValue || value + "." === previousValue) {
        if (caret === 3 && value.substring(3, 4) !== ".") {
            var prefix = value.substring(0, 2);
            var suffix = value.substring(3);
            value = prefix + suffix;
            caret--;
        } else if (caret === 7 && value.substring(7, 8) !== ".") {
            var prefix = value.substring(0, 6);
            var suffix = value.substring(7);
            value = prefix + suffix;
            caret--;
        } else if (caret === 11 && value.substring(11, 12) !== "-") {
            var prefix = value.substring(0, 10);
            var suffix = value.substring(11);
            value = prefix + suffix;
            caret--;
        }
    }

    for (var i = value.length - 1; i >= 0; i--) {
        var char = value[i];
        if (char >= "0" && char <= "9") {
            continue;
        }

        var prefix = value.substring(0, i);
        var suffix = value.substring(i + 1);
        value = prefix + suffix;
        if (caret > i) {
            caret--;
        }
    }

    if (value.length > 11) {
        value = value.substring(0, 11);
    }

    if (value.length >= 3) {
        var prefix = value.substring(0, 3);
        var suffix = value.substring(3);
        value = prefix + "." + suffix;
        if (caret >= 3) {
            caret++;
        }
    }

    if (value.length >= 7) {
        var prefix = value.substring(0, 7);
        var suffix = value.substring(7);
        value = prefix + "." + suffix;
        if (caret >= 7) {
            caret++;
        }
    }

    if (value.length >= 11) {
        var prefix = value.substring(0, 11);
        var suffix = value.substring(11);
        value = prefix + "-" + suffix;
        if (caret >= 11) {
            caret++;
        }
    }

    event.target.value = value;
    event.target.selectionStart = caret;
    event.target.selectionEnd = caret;
    event.target.previousValue = value;
}

function sendFormData(form) {

    const render = renderData()

    form.addEventListener('submit', (e) => {
        e.preventDefault()

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

        fetch('http://localhost:8080/api/saveData', requestOptions).then((response) => {
            console.log(response.status)
            if (response.status == 200) {
                render.outcome('Cadastro concluído!')
            }
            else {
                render.outcome('Algo deu errado..')
            }
        })

    })
}

document.addEventListener('DOMContentLoaded', validateForm)
