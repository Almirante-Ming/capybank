import { getUserData } from '../modules/Cliente.js'
import { renderData } from '../modules/renderData.js'
import { ProtectRoute } from '../modules/ProtectRoute.js'

async function DOMInteraction() {

    const body = document.querySelector('.container')
    
    const render = renderData()
    const data = getUserData()

    .then((user) => {
        render.name(user.nome)
        interactionMenu()
        //render.select(user.id)
        //toggleDialogue() // PRECISA CRIAR CAIXA DE DIÁLOGO NO HTML
    })

    .catch((err) => {
        //ProtectRoute()
        console.log(err)
    })

}

function interactionMenu() {

    const open = document.querySelector('.bx-log-out-circle')
    let is_open = false 

    function abrirMenu() {
        document.getElementById("menu").style.width = "250px";
        document.getElementById("barra").style.marginLeft = "265px"
        document.getElementById("conteudo-1").style.marginLeft = "265px"
    }
    
    function fecharMenu() {
        document.getElementById("menu").style.width = "50px";
        document.getElementById("barra").style.marginLeft = "65px"
        document.getElementById("conteudo-1").style.marginLeft = "65px"
    }

    open.addEventListener('click', () => {

        if (is_open) {
            fecharMenu()
            is_open = false
            return 
        }

        abrirMenu()
        is_open = true

    })
}


// Caixa para realizar operações
/*
function toggleDialogue() {
    const button = document.querySelector('#t-button')
    const dialogue = document.querySelector('.Dialog')
    button.addEventListener('click', () => {
        dialogue.classList.toggle('Open')
    })
}
*/

    



document.addEventListener('DOMContentLoaded', DOMInteraction)