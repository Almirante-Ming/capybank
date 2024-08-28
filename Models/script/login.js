import { renderData } from '../modules/renderData.js'
import { ValidateForm } from '../modules/formDealer.js'

const relation = [
    { id: "cpf", position: 0, minimum: 14, requiredString: [], mustMatch: null, regex: null },
    { id: "senha", position: 1, minimum: 6, requiredString: [], mustMatch: null, regex: null }
]

function DOMInteraction() {
    ValidateForm(relation)
    getFormData()
}

function getFormData() {
    const submit = document.querySelector("#submit")
    submit.addEventListener('click', (e) => {
        e.preventDefault()
        const form = document.querySelector('form')
        sendFormData(form)
    })

}

function sendFormData(form) {

    let formData = new FormData(form)

    let userData = {
        'cpf': formData.get('cpf'),
        'senha': formData.get('senha')
    }

    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(userData)
    }

    fetch('http://localhost:8080/validateData', requestOptions).then(async (response) => {

        if (response.status == 200) {
            window.location.href = './home.html'
            return
        }

        const error = await response.json()
        window.alert(error.message)
        form.reset()

    })

}

document.addEventListener('DOMContentLoaded', DOMInteraction)
