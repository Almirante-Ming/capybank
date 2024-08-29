import { getUserData } from '../modules/Cliente.js'
import { renderData } from '../modules/renderData.js'
import { deleteEmptySpaces } from '../modules/formDealer.js'
import { ProtectRoute } from '../modules/ProtectRoute.js'


async function DOMInteraction() {

    const render = renderData()
    const data = getUserData()

        .then((user) => {

            render.name(user.nome)
            render.cpf(user.__cpf)
            render.telefone(user.__telefone)
            render.email(user.__email)
            render.senha(user.__senha)
            render.nasc(user.data_nascimento)

            InteractWithSenha(user.__senha)


        })
    
    .catch((err) => {
        ProtectRoute()
    })
    

}

function InteractWithSenha(senha) {
    const campo_senha = document.querySelector('#senha')
    const form_senha = document.querySelector('form')

    deleteEmptySpaces(campo_senha)

    campo_senha.addEventListener('mouseenter', () => {
        campo_senha.value = ''
        campo_senha.style.cursor = 'pointer'
        campo_senha.setAttribute('placeholder', 'Digite aqui para alterar sua senha')
    })
    campo_senha.addEventListener('mouseleave', () => {
        campo_senha.setAttribute('value', '')
        campo_senha.value = senha
    })
    form_senha.addEventListener('submit', (e) => {
        e.preventDefault()
        if (campo_senha.value.length < 6) {
            alert('Senha precisa ter no mínimo 6 chars!')
        }
        else {
            openDialogue(campo_senha.value)
        }
    })
}

function openDialogue(senha) {
    const mensagem = `Deseja mesmo alterar sua senha para: ${senha}?`
    const resultado = window.confirm(mensagem)
    if (resultado) { sendFormData(senha) }
}

function sendFormData(senha) {

    let userData = { "senha": senha }

    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(userData)
    }

    fetch('http://localhost:8080/updateData', requestOptions).then(async (response) => {

        if (response.status == 200) {
            alert('Senha alterada com sucesso!')
            window.location.reload()
        }

        alert('Houve algum erro...')
    })

}


document.addEventListener('DOMContentLoaded', DOMInteraction)
