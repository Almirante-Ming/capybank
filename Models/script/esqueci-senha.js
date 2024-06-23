import { renderData } from "../modules/renderData.js"
import { DataValidator } from "../modules/formDealer.js"

const relation = [
    { id: "email", position: 0, minimum: 3, requiredString: [".com", "@"], mustMatch: null, regex: null},
]

function validateForm() {

    const Inputs = document.querySelectorAll('.Input')
    const submit = document.querySelector('#submit-1')
    
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
    
    submit.addEventListener('click', (e) => {
        e.preventDefault()
        const form = document.querySelector('.Forgot-PWD')
        sendFormData(form)
    })

}

function sendFormData(form) {
    
    toggleSubmit('deact')
    toggleLoader('activate')

    let formData = new FormData(form)
    let render = renderData()

    let userData = { "email": formData.get("email"), type : 'send_email' } 
    
    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(userData)
    }

    fetch('http://localhost:8080/sendData', requestOptions).then(async (check_email) => {

        toggleLoader('deact')
        const result = await check_email.json()

        render.outcome(result.message)

        if (check_email.status == 200) { 
            toggleForm('deact')
            return 
        }
      
        toggleSubmit('activate')
        

    }).catch((err) => {
        console.log(err)
    })
  
}  

// Ativar e desativar form
function toggleForm(toggle) {
    const form = document.querySelector('.Forgot-PWD')
    const label = document.querySelector('#email-label')
    const elements = form.elements;

    if (toggle == 'deact') {
        label.style.opacity = 0.5
        elements[0].disabled = true   
        return     
    }
 
    label.style.opacity = 0.1
    elements[0].disabled = false        
    
}

// Ativar e desativar botão de submit
function toggleSubmit(toggle) {
    const submit = document.querySelector('#submit-1')
    
    if (toggle == 'deact') {
        submit.disabled = true
        return
    }
    
    submit.disabled = false
    
}

// Ativar e desativar gif de loading
function toggleLoader(toggle) {
    const loading = document.querySelector('#loading')

    if (toggle == 'deact') {
        loading.style.display = 'none'
        return
    }

    loading.style.display = 'block'
    
}

document.addEventListener('DOMContentLoaded', validateForm)