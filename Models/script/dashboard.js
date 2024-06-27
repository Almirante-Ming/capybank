import { getUserData } from '../modules/Cliente.js'
import { renderData } from '../modules/renderData.js'
import { ProtectRoute } from '../modules/ProtectRoute.js'

async function DOMInteraction() {

    const body = document.querySelector('.container')
    
    const render = renderData()
    const data = getUserData()

    .then((user) => {
        render.name(user.nome)
        //render.select(user.id)
        toggleDialogue()
    })

    .catch((err) => {
        ProtectRoute()
        console.log(err)
    })

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