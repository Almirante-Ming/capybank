import { getUserData } from '../modules/Cliente.js'
import { renderData } from '../modules/renderData.js'
import { DataValidator } from '../modules/formDealer.js'
import { ProtectRoute } from '../modules/ProtectRoute.js'

async function renderUserData() {

    const render = renderData()  
    const data = getUserData()

    .then((user) => {
        render.name(user.nome)
        render.cpf(user.__cpf)
        render.telefone(user.__telefone)
        render.email(user.__email)
        render.senha(user.senha)
        /*
        const button = document.querySelectorAll('.Alterate') 
        button.forEach((btn) => {
            btn.addEventListener('click', () => {
                openDialogue(btn)
            })
        })

        openDeleteDialogue(user.id)
        */

    })
    .catch((err) => {
        //ProtectRoute()
    })


}
/*
function openDialogue(btn) {
    const dialog = document.querySelector('.Dialog')
    if (!(dialog.className.includes('Open'))) {
        dialog.classList.add('Open')
    }
    renderDialogue(dialog, btn.id)
}

function renderDialogue(dialog, id) {
    
    let is_open = true   

    while (dialog.hasChildNodes()) {
        dialog.removeChild(dialog.firstChild)
    }
    
    const form = document.createElement('form')

    const h1 = document.createElement('h1')
    h1.textContent = `Alteração de ${id}`
    
    const section = document.createElement('section')
    
    const label = document.createElement('label')
    label.textContent = `Digite aqui:`
    label.setAttribute('for', id)
    
    const inputBox = document.createElement('div')
    inputBox.className = 'Input'
    
    const input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('name', id)
    input.id = id
    
    const submit = document.createElement('input')
    submit.setAttribute('type', 'submit')
    submit.setAttribute('value', 'Enviar')
    submit.setAttribute('id', 'submit')
    
    const errorMessage = document.createElement('div')
    errorMessage.className = 'Error-Message'
    
    const button = document.createElement('button')
    button.id = 'close-button'
    button.innerHTML = 'X'

    const outcome = document.createElement('div')
    outcome.id = 'outcome'

    inputBox.append(input)
    section.append(label, inputBox, errorMessage)
    form.append(section, submit)
    dialog.append(h1, outcome, form, button) 

    validateForm(id)
    closeDialog(is_open, dialog)
   
}

function closeDialog(bool, dialog)  {
    const close = document.querySelector('#close-button')
    close.addEventListener('click', () => {
        if (bool) { dialog.className = dialog.className.replace('Open', '') }
    })
}

function validateForm(id) {
    
    const Input = document.querySelectorAll('.Input')
    const submit = document.querySelector('#submit')
    
    const validate = DataValidator()
    
    validate.toggleSubmit(submit, Input)
    
    Input.forEach((box) => {
        let input = box.firstElementChild
        let relation = (input.id == 'email')  ? [{ id: "email", position: 0, minimum: 3, requiredString: [".com", "@"], mustMatch: null, regex: null }] : [{ id: "senha", position: 0, minimum: 6, requiredString: [], mustMatch: null, regex: null }]
        
        input.addEventListener('input', (e) => {
            validate.checkRelation(input, relation)
            validate.toggleSubmit(submit, Input)
        })
    })
    
    submit.addEventListener('click', (e) => {
        e.preventDefault()
        const form = document.querySelector('form')
        sendFormData(form, id)
    })
    
}

function sendFormData(form, id) {
    
    let formData = new FormData(form)
    let render = renderData()

    let userData = id == 'email' ? { "email": formData.get(`${id}`) } : { "senha": formData.get(`${id}`) } 
    
    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(userData)
    }

    fetch('http://localhost:8080/updateData', requestOptions).then(async (response) => {
        
        const result = await response.json()
        
        if (response.status == 200) {
            window.location.reload()   
        }
    })
     
    const dialog = document.querySelector('.Dialog')
    const button = document.querySelectorAll('.Alterate')
    

    button.forEach((btn) => {
        btn.addEventListener('click', () => {
            if (!(dialog.className.includes('Open'))) {
                dialog.classList.add('Open')
            }
            renderDialogue(dialog, btn.id)
        })
    })

}

//Todas as interações possíveis com a caixa de diálogo: deletar conta
function openDeleteDialogue(id) {

    const a = document.querySelector('a')
    const dialogue = document.querySelector('.Delete_Acc')

    function openDialogue() {
        a.addEventListener('click', (e) => {
            e.preventDefault()
            dialogue.classList.toggle('Open')
        })    
    }

    function closeDialogue() {
        dialogue.classList.toggle('Open')
    }

    function getAnswer() {
        const yes = document.querySelector('#yes')
        const no = document.querySelector('#no')
        yes.addEventListener('click', () => {startDelete()})
        no.addEventListener('click', () => {closeDialogue()})
    }

    function startDelete() {

        let userData = { 
            'user_id': id 
        }

        let requestOptions = {
            method: 'POST',
            body: JSON.stringify(userData)
        }

        console.log(userData, requestOptions)
        // Faz o fetch para uma URL /deleteData
        /*
        fetch('http://localhost:8080/deleteData', requestOptions).then(async(response) => {
        
            if (response.status == 200) {
                alert('Conta deletada')
                ProtectRoute()
            }
        })
    }
    
    
    openDialogue()
    getAnswer()
    
}
*/


document.addEventListener('DOMContentLoaded', renderUserData)
