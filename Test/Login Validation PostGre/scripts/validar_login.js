// Toda vez que quero abrir a base de dados, preciso instanciar nova conexão...

const formidable = require('formidable') // Importar biblioteca que pega dados de formulário

function validateLogin(data) {
    console.log(data.nome, data.senha) // Quando clicar no submit de login, as informações de nome e senha são extraídas e armazenadas em form. Essa informação pode ser posteriormente manipulada para consultar o banco e retornar uma saída p/ usuário.
}

module.exports = validateLogin
