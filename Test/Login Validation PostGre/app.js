const http = require('http')

/* PÁGINAS FRONT END */
const loginPage = require('./pages/login/html.js')
const registerPage = require('./pages/cadastro/html.js')

/* SCRIPTS DE PROCESSAMENTO */
const getFormData = require('./scripts/pegar_dados.js')
const saveData = require('./scripts/salvar_cadastro.js')
const validateLogin = require('./scripts/validar_login.js')

/* DATABASE */
const { addTable } = require('./database/clientes.js') // Quando o servidor local é inicializado, a tabela dados_clientes é criada

const server = http.createServer((req, res) => {
  
    // RENDERIZA AS PÁGINAS DE FRONT-END NO SERVIDOR

    if (req.url === '/' || req.url === '/login.html') {
        res.writeHead(200, { 'Content-Type': 'text/html'})
        res.end(loginPage)
    }

    else if (req.url === '/cadastro.html') {
        res.writeHead(200, { 'Content-Type': 'text/html'})
        res.end(registerPage)
    }

    // LIDA COM AS REQUISIÇÕES DE UM FORMULÁRIO (ACTION)

    else if (req.url === '/salvar_cadastro.js') {
        // Função assíncrona, o getFormData vai trabalhar com o dado (req). Os outros dois dados (err, data) são as resposta assíncronas. A função getFormData está localizada em scripts/pegar_dados.js
        const formData = getFormData(req, (err, data) => {
            // Se der erro, o callback exibe o erro
            if (err) {
                console.error('Erro ao processar o registro:', error);
                return;
            }
            // Se funcionar, o dicionário é armazenado em 'data' e enviado para a função saveData (armazenado em scripts/salvar_cadastro.js)
            else {
                saveData(data)
                res.end('<h1> Cadastro realizado com sucesso! </h1> \n <a href = "login.html">Voltar</a>')
            }
        });

    }

    else if (req.url === '/validar_login.js') {
        const formData = getFormData(req, (err, data) => {
            if (err) {
                console.error('Erro ao processar o registro:', error);
                return;
            }
            else {
                validateLogin(data)
                res.end('<h1> HAHAHAHAHAHAHAHAHHAHAHAHAA </h1>')
            }
        });
         
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Página não encontrada');
    }
    
});


// Processo assíncrono.. A função addTable importada de database/clients tem como retorno um booleano que é True ou False. Se for false, ele impede que o servidor execute e encerra a função assíncrona.
addTable().then(isConnected => {

    if (!isConnected) {
        console.log('Não foi possível conectar ao banco de dados. O servidor não será iniciado.')
        return
    }

    console.log('Conexão com o banco de dados estabelecida. Tabela dados_clientes criada. Iniciando o servidor...');
    server.listen(8080, 'localhost', () => {
        console.log('Servidor rodando na porta 8080')     
    })

})


