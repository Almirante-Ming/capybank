const http = require('http')

/* PÁGINAS FRONT END */
const loginPage = require('./pages/login/html.js')
const registerPage = require('./pages/cadastro/html.js')
const dashboard = require('./pages/dashboard/html.js')

/* SCRIPTS DE PROCESSAMENTO */
const getFormData = require('./scripts/pegar_dados.js')
const saveData = require('./scripts/salvar_cadastro.js')
const validateLogin = require('./scripts/validar_login.js')

/* DATABASE */
const { addTable } = require('./database/clientes.js') // Cria tabela dados_clientes

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

    else if (req.url === '/dashboard.html') {
        res.writeHead(200, { 'Content-Type': 'text/html'})
        res.end(dashboard)
    }

    // LIDA COM AS REQUISIÇÕES DE UM FORMULÁRIO (ACTION)

    else if (req.url === '/salvar_cadastro.js') {
        // Função que recebe os dados de formulário
        const formData = getFormData(req, (err, data) => {
            if (err) {
                console.error('Erro ao processar o registro:', error);
                return;
            }
            else {
                saveData(data) // Salva os dados do formulário no servidor postGRESQL
                res.end('<h1> Cadastro realizado com sucesso! </h1> \n <a href = "login.html">Voltar</a>') // Mensagem de sucesso
            }
        });

    }

    else if (req.url === '/validar_login.js') {
        // Pega dados de formulário de login
        const formData = getFormData(req, (err, data) => {

            if (err) {
                console.error('Erro ao processar o registro:', error);
                return;
            }
            else {
                // Começa a validar o login com os dados enviados (nome, senha)
               validateLogin(data).then(login => { 
                    if (login == true) {
                        res.writeHead(302, { 'Location': '/dashboard.html' }); // Manda a URL para dashboard se encontrar login
                        res.end() 
                    }
                    else {
                        res.end(`<script>alert("ERRO! Login não encontrado")</script>`) // Alert de erro, caso não encontre nada corresondente..
                    }
                });
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


