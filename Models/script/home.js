
import { getUserData } from '../modules/Cliente.js'
import { renderData } from '../modules/renderData.js'
import { ProtectRoute } from '../modules/ProtectRoute.js'
import { MenuInteraction } from '../modules/MenuInteraction.js'


async function DOMInteraction() {

    MenuInteraction()
    renderServerData()

}

function renderServerData() {
    const body = document.querySelector('.container')

    const render = renderData()
    const data = getUserData()

        .then((user) => {
            render.name(user.nome)
            render.saldo(user.saldo)
        })

        .catch((err) => {
            ProtectRoute()
            console.log(err)
        })
}

document.addEventListener('DOMContentLoaded', DOMInteraction)