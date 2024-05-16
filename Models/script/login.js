import {renderData} from '../modules/renderData.js'

function validateForm() {
    const inputs = document.querySelectorAll('input')
    inputs.forEach((input) => {
        input.addEventListener('input', (e) => {
            if (input.id == 'cpf') { cpfMaskOnInput(e) }
        })
    })

    sendFormData()
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

function sendFormData() {
    const form = document.querySelector('form')
    const render = renderData()

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        let formData = new FormData(form)

        let userData = {
            'cpf': formData.get('cpf'),
            'senha': formData.get('senha')
        }

        let requestOptions = {
            method: 'POST',
            body: JSON.stringify(userData)
        }

        fetch('http://localhost:8080/api/validateData', requestOptions).then((response) => {
            if (response.status == 200) { 
                window.location.href = '/dashboard.html'
            } 
            else { 
                render.outcome('ID ou senha incorretos!') 
            } 
        })
        
    })
      
}

document.addEventListener('DOMContentLoaded', validateForm)