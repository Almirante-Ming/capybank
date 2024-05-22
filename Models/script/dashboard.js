import { getUserData } from '../modules/Cliente.js'
import { renderData } from '../modules/renderData.js'

async function DOMInteraction() {

    const body = document.querySelector('.container')
    
    const render = renderData()
    const data = getUserData()

    .then((user) => {
        render.name(user.nome)
        render.select(user.id)
        toggleDialogue()
    })
    .catch((err) => {
        const redirectTo = window.location.href.includes("Models") ? '../Models/login.html' : 'login.html'
        window.location.href = redirectTo
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