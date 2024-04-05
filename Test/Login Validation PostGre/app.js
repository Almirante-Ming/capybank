const http = require('http')

/* PÁGINAS FRONT END */
const loginPage = require('./pages/login/html.js')
const registerPage = require('./pages/cadastro/html.js')

/* SCRIPTS DE PROCESSAMENTO */
const getFormData = require('./scripts/pegar_dados.js')
const saveData = require('./scripts/salvar_cadastro.js')

/* DATABASE */
const clientes = require('./database/clientes.js') // Quando o servidor local é inicializado, a tabela dados_clientes é criada

const server = http.createServer((req, res) => {
  
    if (req.url === '/' || req.url === '/login.html') {
        res.writeHead(200, { 'Content-Type': 'text/html'})
        res.end(loginPage) // Renderiza a página de login puxando os scripts
    }

    else if (req.url === '/cadastro.html') {
        res.writeHead(200, { 'Content-Type': 'text/html'})
        res.end(registerPage) // Renderiza a página de cadastro puxando os scripts
    }

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

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Página não encontrada');
    }
    
});


server.listen(8080, 'localhost', () => {
    console.log('Servidor rodando na porta 8080');
});

