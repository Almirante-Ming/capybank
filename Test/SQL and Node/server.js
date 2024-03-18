const http = require('http'); // Módulo do NODE.JS que permite interação HTTP
const fs = require('fs'); // Módulo do NODE.JS que permite ler arquivos
const db = require('./database.js') // Importa a base de dados
const User = require('./models/Users.js') // Importa a tabela criada

const server = http.createServer((req, res) => {
    // Quando o servidor local é inicializado, o fs.readFile exibe a página HTML na tela
    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data)
        return res.end()
    })

    // Essa porção de código só irá rodar após o botão 'SUBMIT' do formulário receber um clique, ou seja, após as informações serem enviadas (utilizando action e method)
    // Verifica se a url é /server (aqui dentro) e se o método enviado foi POSTs
    if (req.url == '/server' && req.method == 'POST') {

        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString(); // Envia os dados do formulário convertido para STRING
        });



        req.on('end', async () => { // Função assíncrona

            try {

                // O padrão de body sempre será: nome='user'&password='password'. Então abaixo é uma gambiarra para separar os valores
                let string1 = body.replace('nome=', '')
                let string2 = string1.replace('&password', '')
                string2 = string2.replace('=', ' ')
                string2 = string2.split(' ')

                formData1 = string2[0] // Armazena o NOME
                formData2 = string2[1] // Armazena a SENHA

                // ===== Inserir dados na tabela SQL, com o módulo importado (Users) =========

                const user = await User.create({ nome: formData1, senha: formData2 }); // Cria a tabela
                console.log('Usuário criado com sucesso:', user.toJSON()); // user.toJSON exibe os dados no formato de dicionário
            } catch (error) {
                console.error('Erro ao criar usuário:', error);
            }
        })
    }
})

// Inicia o servidor
server.listen(8080, 'localhost', () => {
    console.log('Servidor rodando na porta 8080');
});
