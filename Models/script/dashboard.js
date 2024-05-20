import { getUserData } from '../modules/Cliente.js'
import { renderData } from '../modules/renderData.js'

async function DOMInteraction() {
    
    const user = await getUserData()
    const render = renderData()

    render.name(user.nome) // renderiza nome do usuário
    render.select(user.id) // renderiza botão select

    toggleDialogue()
    
}

// Caixa para realizar operações
function toggleDialogue() {
    const button = document.querySelector('#t-button')
    const dialogue = document.querySelector('.Dialog')
    button.addEventListener('click', () => {
        dialogue.classList.toggle('Open')
    })
}

document.addEventListener('DOMContentLoaded', DOMInteraction)