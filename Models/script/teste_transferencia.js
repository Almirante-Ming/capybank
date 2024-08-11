import { renderData } from '../modules/renderData.js'
import { getUserData } from '../modules/Cliente.js'

// INFO DO USER LOGADO
const render = renderData()
const user = await getUserData()
render.name(user.nome)

// FETCH para pegar o JSON das transferências
async function getTransferData() {
    const database_fetch = await fetch('http://localhost:8080/api/transferencia')
    const response = await database_fetch.json()
    return response
}

// Constrói os elementos na DOM 

async function DOMBuilder() {

    // Função auxiliar
    function createData(content) {
        
        const span = document.createElement('span')
        span.innerHTML = content
        return span
        
    }

    function getOperation(row) {

        let campo_nome, campo_valor, campo_data, campo_op
    
        if (user.nome == row.nome_recebe) {

            campo_nome = createData(row.nome_envia)
            campo_valor = createData(row.valor)
            campo_data = createData(row.date)
            campo_op = createData('Entrada')
            campo_valor.innerHTML += '+'

            campo_nome.style.color = 'green'
            campo_valor.style.color = 'green'
            campo_data.style.color = 'green'
            campo_op.style.color = 'green'

        }

        else {
            campo_nome = createData(row.nome_recebe)
            campo_valor = createData(row.valor)
            campo_data = createData(row.date)
            campo_op = createData('Saída')
            campo_valor.innerHTML += '-'

            campo_nome.style.color = 'red'
            campo_valor.style.color = 'red'
            campo_data.style.color = 'red'
            campo_op.style.color = 'red'
        }


        return {campo_nome, campo_valor, campo_data, campo_op}

    }
    
    const table = document.querySelector('.table')

    const response = await getTransferData()

    response.forEach((row) => {
        const operation = getOperation(row)
        table.append(operation.campo_nome, operation.campo_valor, operation.campo_data, operation.campo_op)

    })
}



DOMBuilder().then((r) => {console.log(r)})




