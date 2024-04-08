
const formidable = require('formidable') // Importar biblioteca que pega dados de formulário

// Aqui é repassado o req (requisição HTTPS) e o callback para lidar com resposta assíncrona
function getFormData(req, callback) {
    
    const form = new formidable.IncomingForm() // Método do formidable para lidar com formulário

    form.parse(req, (err, fields) => {
        // Aqui é armazenada a resposta assíncrona 1 e encerra a função caso True
        if (err) {
            callback(err, null)
            return
        }
        // Aqui é armazenada a resposta assíncrona  2, com armazenamento dos dados do formulário em variáveis correspondentes
        const nome = fields.name
        const cpf = fields.cpf
        const email = fields.email
        const telefone = fields.telefone
        const dataNascimento = fields.data_nascimento
        const senha = fields.senha

        // Essas condicionais servem para reutilizar essa função nos dois contextos: pegar informção do cadastro e pegar informação do login
        if (req.url === '/salvar_cadastro.js') {
            callback(null, { nome, cpf, email, telefone, dataNascimento, senha }) // Necessário para associar o VALUE ao fieldNAME
        }
        else if (req.url === '/validar_login.js') {
           callback(null, {nome, senha})
        }

    })
}

module.exports = getFormData
