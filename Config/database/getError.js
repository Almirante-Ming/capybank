// Função auxiliar para processar erros internos do banco de dados e retornar mensagem customizada

function getError(error) {
    if (typeof(error.detail) === 'string') { return getMessage_Detail(error.detail, already_exists) }
    else { return 'Algo deu errado' }  
}

const already_exists = {
    'cpf': 'CPF já cadastrado no CapiBank!',
    'telefone': 'Telefone já cadastrado no CapiBank!',
    'email': 'Email já cadastrado no CapiBank!'
}

function getMessage_Detail(detail, messages) {

    if (detail.includes('already exists')) {
        for (key in messages) {
            if (detail.includes(key)) { return messages[key] }
        }
    }
    
}


module.exports = { getError }