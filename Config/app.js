const http = require('http')

/* PÁGINAS FRONT END */
const login_page = require('./pages/login/html.js')
const register_page = require('./pages/cadastro/html.js')
const dashboard = require('./pages/dashboard/html.js')

/* SCRIPTS DE PROCESSAMENTO */
const get_form_data = require('./scripts/pegar_dados.js')
const save_data = require('./scripts/salvar_cadastro.js')
const validate_login = require('./scripts/validar_login.js')

/* DATABASE */
const { addTable } = require('./database/clientes.js') // Cria tabela dados_clientes

const server = http.createServer((req, res) => {

    // RENDERIZA AS PÁGINAS DE FRONT-END NO SERVIDOR

    if (req.url === '/' || req.url === '/login.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(login_page)
    }

    else if (req.url == '/loginError.html') {
        const result =
            `
            ${login_page}
            <script>
                let error_message = document.querySelector('.flash-error')
                error_message.style.display = 'flex'
            </script>`
        res.end(result)
    }

    else if (req.url === '/cadastro.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(register_page)
    }

    else if (req.url === '/dashboard.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(dashboard)
    }

    // LIDA COM AS REQUISIÇÕES DE UM FORMULÁRIO (ACTION)

    else if (req.url === '/salvar_cadastro.js' || req.url === '/validar_login.js') {
        // Função que recebe os dados de formulário
        const form_data = get_form_data(req, (err, data) => {

            if (err) {
                return 'Erro ao processar o registro:' + error
            }

            else {

                if (req.url === '/salvar_cadastro.js') {
                    save_data(data)
                    res.end('<h1> Cadastro realizado com sucesso! </h1> \n <a href = "login.html">Voltar</a>') // Mensagem de sucesso
                }

                else if (req.url === '/validar_login.js') {
                    validate_login(data).then(login => {
                        const redirectUrl = login ? '/dashboard.html' : '/loginError.html'; // Condicional que define a URL
                        res.writeHead(302, { 'Location': redirectUrl });
                        res.end();
                    });

                }
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


