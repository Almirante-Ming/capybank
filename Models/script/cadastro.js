

function validateForm(e) {

    const inputs = document.querySelectorAll('input')
    const submit = document.querySelector('button')
    const flash_error = document.querySelector('.flash.error')

    const errorMessage = document.querySelectorAll('.Error-Message')
    const errorSign = document.querySelectorAll('.Error-Sign')
    const inputBox = document.querySelectorAll('.Input')
    const bx = document.querySelectorAll('.bx')

    let result

    function databaseResponse() {

        const getResponse = async function () {
            
            const response = await fetch('http://localhost:8080/cadastro.html');
            
            const customMessage = response.headers.get('Custom-Message');
            
            if (response.status == 401) {

                flash_error.style.display = 'flex'

                
                if (customMessage.includes('cpf')) {
                    showErrorMessage(inputBox[1], errorSign[1], errorMessage[1], 'Esse CPF já está em uso!')
                }

                if (customMessage.includes('email')) {
                    showErrorMessage(inputBox[2], errorSign[2], errorMessage[2], 'Esse email já está em uso!')
                }

                if (customMessage.includes('telefone')) {
                    showErrorMessage(inputBox[3], errorSign[3], errorMessage[3], 'Esse telefone já está em uso!')
                }



            }
        }

        getResponse()
            
    }

    function formResponse() {

        inputs.forEach((input) => {

            input.addEventListener('input', (e) => {
                checkErrors(input, result, inputBox, errorSign, errorMessage)
                
                if (input.id == 'cpf') {
                    cpfMaskOnInput(e)
                }
    
                if (input.id == 'telefone') {
                    phoneMaskOnInput(e)
                }
            })
    
            input.addEventListener('blur', () => {
                checkErrors(input, result, inputBox, errorSign, errorMessage)
            })
    
            bx.forEach((check) => {
                check.addEventListener('click', () => {
                    check.classList.toggle('show')
                    let showPassword = (input.type == 'password' ? 'text' : 'password')
                    if (input.id == 'senha' && check.id == 'p1') { input.type = showPassword }
                    if (input.id == 'senha2' && check.id == 'p2') { input.type = showPassword }
                })
            })
    
            submit.addEventListener('click', (e) => {
                const errors = checkErrors(input, result, inputBox, errorSign, errorMessage)
                if (errors === showErrorMessage) { e.preventDefault() }
            })
    
        })
    
    }
    
    databaseResponse()
    formResponse()

}

let checkPassword

function checkErrors(input, result, inputBox, errorSign, errorMessage) {

    if (input.id == 'nome') {
        result = input.value.length < 3 ? showErrorMessage : hideErrorMessage
        result(inputBox[0], errorSign[0], errorMessage[0], 'Nome precisa ter no mínimo 3 caracteres!')
    }

    else if (input.id == 'cpf') {
        result = input.value.length < 14 ? showErrorMessage : hideErrorMessage
        //result = validateCPF(input.value) == false ? showErrorMessage : hideErrorMessage
        result(inputBox[1], errorSign[1], errorMessage[1], 'CPF precisa ter 14 caracteres!')
    }

    else if (input.id == 'email') {
        result = !(input.value.includes('.com')) ? showErrorMessage : hideErrorMessage
        result(inputBox[2], errorSign[2], errorMessage[2], 'Digite no formato de e-mail (@dominio.com)')
    }

    else if (input.id == 'telefone') {
        result = input.value.length < 14 ? showErrorMessage : hideErrorMessage
        result(inputBox[3], errorSign[3], errorMessage[3], 'Telefone precisa ter 14 caracteres!')
    }

    else if (input.id == 'date') {
        result = (input.value == '') ? showErrorMessage : hideErrorMessage
        result(inputBox[4], errorSign[4], errorMessage[4], 'Insira sua data de nascimento!')
    }

    else if (input.id == 'senha') {
        result = input.value.length < 6 ? showErrorMessage : hideErrorMessage
        result(inputBox[5], errorSign[5], errorMessage[5], 'Senha deve ter mais de 6 caracteres!')
        checkPassword = input.value
    }

    else if (input.id == 'senha2') {
        result = checkPassword !== input.value ? showErrorMessage : hideErrorMessage
        result(inputBox[6], errorSign[6], errorMessage[6], 'Senhas não coincidem!')
    }

    return result
}

/*
function validateCPF(value) {

    if (value.length > 13) {
        console.log(value)
        value = value.replace('.', '')
        value = value.replace('.', '')
        value = value.replace('-', '')

        let sum = 0
        let digit = 10 

        for (i=0; i < 9;i++) {
            sum = sum + digit * value[i] 
            digit = digit - 1
        }

        firstDigit = (sum * 10) % 11
        
        if (value[9] == firstDigit) {

            sum = 0
            digit = 11

            for (i=0; i < 10;i++) {
                sum = sum + digit * value[i] 
                digit = digit - 1
            }

            secondDigit = (sum * 10) % 11

            if (value[10] == secondDigit) {
                return true
            }
        }

        return false
        
    }

}
*/

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

function phoneMaskOnInput(event) {
    
    var value = event.target.value 
    var caret = event.target.selectionStart;
    var previousValue = event.target.previousValue;
   
    if (value + " " === previousValue || value + '-' === previousValue) {
   
        if (caret === 4 && value.substring(3, 4) !== " ") {
            var prefix = value.substring(0, 2);
            var suffix = value.substring(3);
            value = prefix + suffix;
            caret--;
        }   
        console.log(caret)

        if (caret === 9 && value.substring(9, 10) !== " ") {
            var prefix = value.substring(0, 8);
            var suffix = value.substring(9);
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
       
        //value = '(' + prefix + suffix;

    } 
    
    if (value.length == 2) {
        prefix = value.substring(0, 1)
        suffix = value.substring(1, 2) 
        value = '(' + prefix + suffix + ')' + ' '
        if (caret >= 2) {
            caret += 3
        }
    }

    if (value.length == 5) {
        prefix = (value.substring(0, 5))
        value = prefix  
        if (caret >= 5) {
            console.log(caret)
            caret += 1
        }
    }


    if (value.length == 9) {
        prefix = (value.substring(0, 9))
        value = prefix + '-' 
        if (caret >= 9) {
            caret += 1
        }
    }

    console.log(value.length)
    /* 
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
    
    */
    event.target.value = value;
    event.target.selectionStart = caret;
    event.target.selectionEnd = caret;
    event.target.previousValue = value;
}


function showErrorMessage(inputBox, errorSign, error, text) {
    inputBox.style.border = '1px solid red'
    errorSign.style.display = 'block'
    error.textContent = text
}

function hideErrorMessage(inputBox, errorSign, error, text) {
    inputBox.style.border = '1px solid black'
    errorSign.style.display = 'none'
    error.textContent = ''
}

document.addEventListener('DOMContentLoaded', validateForm)

