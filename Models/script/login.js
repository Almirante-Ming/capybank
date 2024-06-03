import {renderData} from '../modules/renderData.js'
import { DataFormatter } from '../modules/DataFormatter.js'

function validateForm() {

    const inputs = document.querySelectorAll('input')
    const format = DataFormatter()

    inputs.forEach((input) => {
        input.addEventListener('input', (e) => {
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

        fetch('http://localhost:8080/validateData', requestOptions).then( async (response) => {
            if (response.status == 200) {
                window.location.href = window.location.href.includes('Models') ? '../Models/dashboard.html' : '/dashboard.html'
            }
            else {
                const error = await response.json()
                render.outcome(error.message)
            }
        })
        
    })
      
}

document.addEventListener('DOMContentLoaded', validateForm)