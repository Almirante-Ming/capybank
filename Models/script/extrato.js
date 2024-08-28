import { getUserData } from '../modules/Cliente.js'
import { renderData } from '../modules/renderData.js'
import { ProtectRoute } from '../modules/ProtectRoute.js'
import { formatDate } from '../modules/formDealer.js'
import { MenuInteraction } from '../modules/MenuInteraction.js'


function DOMInteraction() {
    
    const render = renderData()
    const data = getUserData()
        .then((user) => {
            renderExtrato(user)
            MenuInteraction()
            render.name(user.nome)
        })
        .catch((err) => {
            ProtectRoute()
        })
}


async function getTransferData() {
    const database_fetch = await fetch('http://localhost:8080/api/transferencia')
    const response = await database_fetch.json()
    return response
}

function buildDIVS(user) {

    const wrapper = () => {
        const pago1 = document.createElement("div")
        pago1.className = 'pago1'
        return pago1
    }

    const nome = (valor) => {
        const lugar = document.createElement('div')
        const lugar_span = document.createElement('span')
        lugar_span.textContent = valor
        lugar.append(lugar_span)
        lugar.className = 'lugar global'
        return lugar
    }

    const tipo_operacao = (row) => {
        const pagamento = document.createElement('div')
        const pagamento_span = document.createElement('span')
        // Se o nome de quem RECEBEU dinheiro no banco é o mesmo nome do usuário logado, significa que foi uma operação de entrada
        if (user.nome == row.nome_recebe) {
            var tipo = 'Entrada'
        }
        else {
            var tipo = 'Saída'
        }
        pagamento_span.textContent = tipo
        pagamento.append(pagamento_span)
        pagamento.className = 'pagamento global'
        return pagamento
    }

    const icone = (tipo) => {
        const icone = document.createElement('div')
        icone.className = 'icone'
        icone.innerHTML = "<i class='bx bxs-dollar-circle'></i>"
        if (tipo == 'Entrada') {
            icone.style.background = '#68b856'
        }
        else {
            icone.style.background = 'red'
        }
        return icone
    }

    const data = (valor) => {
        const data = document.createElement('div')
        const span_data = document.createElement('span')
        span_data.textContent = formatDate(valor)
        data.className = 'data global'
        data.append(span_data)
        return data
    }

    const total = (valor, tipo) => {
        const total = document.createElement('div')
        const total_span = document.createElement('span')
        if (tipo == 'Entrada') {
            total_span.style.color = '#68b856'
            total_span.textContent = `R$ +${valor} `
        }
        else {
            total_span.style.color = 'red'
            total_span.textContent = `R$ -${valor} `
        }
        total.append(total_span)
        total.className = 'valor global'
        return total
    }

    return { wrapper, icone, nome, tipo_operacao, data, total }
}

function renderExtrato(user) {

    const buildDOM = buildDIVS(user)
    const container = document.querySelector(".extratos")

    const response = getTransferData().then((r) => {
        console.log(r)
        r.forEach((row) => {
            var extrato = buildDOM.wrapper()
            var operacao = buildDOM.tipo_operacao(row)

            if (operacao.textContent == 'Entrada') {
                var icon = buildDOM.icone('Entrada')
                var valor = buildDOM.total(row.valor, 'Entrada')
                var nome = buildDOM.nome(row.nome_envia)
            }

            else {
                var icon = buildDOM.icone('Saída')
                var valor = buildDOM.total(row.valor, 'Saída')
                var nome = buildDOM.nome(row.nome_recebe)
            }

            var data = buildDOM.data(row.date)
            extrato.append(icon, data, nome, operacao, valor,)
            container.append(extrato)
        })
    })

}




document.addEventListener('DOMContentLoaded', DOMInteraction())