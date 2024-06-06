import {renderData} from '../modules/renderData.js'
import { DataFormatter } from '../modules/DataFormatter.js'
import { DataValidator } from '../modules/DataValidator.js'

const relation = [
    { id: "cpf", position: 0, minimum: 14, requiredString: [], mustMatch: null, regex: null},
    { id: "senha", position: 1, minimum: 6, requiredString: [], mustMatch: null, regex: null }
]

function validateForm() {

    const Inputs = document.querySelectorAll('.Input')
    const submit = document.querySelector('#submit')
    
    const format = DataFormatter()
    const validate = DataValidator()

    validate.toggleSubmit(submit, Inputs)

    Inputs.forEach((box) => {
        let input = box.firstElementChild

        input.addEventListener('input', (e) => {
            validate.checkRelation(input, relation)
            validate.toggleSubmit(submit, Inputs)
            if (input.id == 'cpf') { format.CPF(e) }
        })
    })


    sendFormData()
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

        console.log(requestOptions.body)

        fetch('http://localhost:8080/validateData', requestOptions).then( async (response) => {
            if (response.status == 200) {
                window.location.href = window.location.href.includes('Models') ? '../Models/dashboard.html' : '/dashboard.html'
            }
            else {
                const error = await response.json()
                render.outcome(error.message)
                form.reset()
            }
        })
        
    })
      
}

document.addEventListener('DOMContentLoaded', validateForm)