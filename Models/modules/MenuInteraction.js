// Função que abre e fecha o menu

export function MenuInteraction() {

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