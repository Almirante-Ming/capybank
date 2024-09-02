import { getUserData } from '../modules/Cliente.js'
import { ProtectRoute } from '../modules/ProtectRoute.js'
import { DataFormatter, DataValidator } from '../modules/formDealer.js'

const relation = [
    { id: "cpf", position: 0, minimum: 14, requiredString: [], mustMatch: null, regex: null},
]

function DOMInteraction() {
    const data = getUserData()

    .then((user) => {
        exibirSaldo(user.saldo)
        validateForm()
        getFormData()
    })
    .catch((err) => {
        ProtectRoute()
    })

}

function validateForm() {
    const Inputs = document.querySelectorAll('.Inputs')
    const submit = document.querySelector('#submit')

    const format = DataFormatter()
    const validate = DataValidator()

    validate.toggleSubmit(submit, Inputs)

    Inputs.forEach((box) => {
        const input = box.firstElementChild
        
        input.addEventListener('input', (e) => {
            if (input.id == 'cpf') { format.CPF(e) }
            validate.checkRelation(input, relation)
            validate.toggleSubmit(submit, Inputs)
        })

   

    })
}

function exibirSaldo(valor) {
    const dispo = document.querySelector("#dispo")
    dispo.setAttribute('placeholder', valor)
}

function getFormData() {

    const form = document.querySelector('form')

    form.addEventListener('submit', (e) => {
        
        e.preventDefault()
        const form_data = new FormData(form)
        const userData = {
            'cpf': form_data.get('cpf'),
            'nome': form_data.get('nome'),
            'valor': form_data.get('tranfe'),
            'descricao': form_data.get('descri'),
            'type': 'transfer_cash'
        }  

        let requestOptions = {
            method: 'POST',
            body: JSON.stringify(userData),
        }

        sendFormData(requestOptions)
    })

}

function sendFormData(options) {

    fetch('http://localhost:8080/sendData', options).then(async (response) => {

    const result = await response.json()
    alert(result.message)

})
}

document.addEventListener('DOMContentLoaded', DOMInteraction)
