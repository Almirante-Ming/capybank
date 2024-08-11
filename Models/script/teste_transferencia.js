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

    function getOperation(transfer_entrada_nome, nome, valor, data) {

        let operation_type

        if (user.nome == transfer_entrada_nome) {
            operation_type = createData('Entrada')
            nome.style.color = 'green'
            valor.style.color = 'green'
            valor.innerHTML += '+'
            data.style.color = 'green'
            operation_type.style.color = 'green'
        }
        else {
            operation_type = createData('Saída')
            nome.style.color = 'red'
            valor.style.color = 'red'
            valor.innerHTML += '-'
            data.style.color = 'red'
            operation_type.style.color = 'red'
        }

        return operation_type

    }
    
    const table = document.querySelector('.table')

    const response = await getTransferData()

    response.forEach((row) => {
        const campo_nome = createData(row.nome_recebe)
        const campo_valor = createData(row.valor)
        const campo_data = createData(row.date)

        const operation = getOperation(row.nome_recebe, campo_nome, campo_valor, campo_data)

        table.append(campo_nome, campo_valor, campo_data, operation)
    })
}



DOMBuilder().then((r) => {console.log(r)})




