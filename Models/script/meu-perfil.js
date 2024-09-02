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
    const campo_senha = document.querySelector('#alterate-pwd')

    campo_senha.addEventListener('click', () => {
        const nova_senha = window.prompt('Digite sua nova senha: ')
        if (nova_senha.length < 6) { 
            alert ("Sua senha não pode ter menos de 6 chars!")
            return
        }
        if (nova_senha == senha) {
            alert ("Você digitou a mesma senha cadastrada!")
            return
        }

        openDialogue(nova_senha)
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
