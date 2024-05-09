import { getUserData } from '../modules/Cliente.js'
import { renderData } from '../modules/renderUserData.js'

async function DOMInteraction() {
    
    const user = await getUserData()
    const renderUser = renderData()

    renderUser.name(user.nome)
    renderUser.cpf(user.cpf)
    renderUser.email(user.email)
    renderUser.telefone(user.telefone)
    renderUser.senha(user.senha)
    
}

document.addEventListener('DOMContentLoaded', DOMInteraction)