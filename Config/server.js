const http = require('http')

// FUNÇÃO QUE LÊ OS ARQUIVOS DO FRONT-END
const getFiles = require('./scripts/getFile')

// FUNÇÃO QUE CRIA TABELA
const { addTable } = require('./database/database') 

// SCRIPTS INTERAÇÃO FORM X BANCO
const getFormData = require('./scripts/getFormData')
const saveData = require('./scripts/saveData')
const validateData = require('./scripts/validateData')

// BIBLIOTECA NODE PARA EXTRAIR DADOS DA URL
var parse = require('url').parse

// ARQUIVO CONFIG.JSON
var config = require('./config.json')
var pasta_root = config.rootFolder
var inicial = config.defaultIndex
var types = config.types

let fetchResult 

const server = http.createServer((req, res) => {

    function renderPage() {

        var arquivo_front = parse(req.url).pathname, path, extension
        
        if (req.url == '/') {
            arquivo_front = inicial
        }
        
        path = pasta_root + arquivo_front
        extension = path.substr(path.lastIndexOf('.') + 1);

        getFiles(path, function (data) {
            let head = checkError(arquivo_front) == false ? 401 : 200
            res.writeHead(head, { 'Content-Type': types[extension] || 'text/plain',});
            res.end(data);
        }, function (err) {
            console.log(err)
            res.writeHead(404);
            res.end(); 
        });


        function checkError(file) {
            if (file.includes('html') && typeof(fetchResult) == 'function') { // Checa se o arquivo é html e se inicializou uma função
                return fetchResult()
            }
        }
    }
   
    if (req.url === '/salvar_cadastro.js' || req.url === '/validar_login.js') {
        
        const captureForm = getFormData(req, (err, data) => {
            
            if (err) {
                return 'Erro ao processar o registro:' + err
            }

            let operation  = req.url == '/salvar_cadastro.js' ? saveData(data) : validateData(data) // Retorna booleano que indica o estado de login / cadastro
            let page = req.url == '/salvar_cadastro.js' ? 'cadastro.html' : 'login.html' // Página que será direcionado de volta em caso de erro
     
            operation.then((result) => {
                console.log(result)
            })
                /*
                if ((result.dataSaved) && page == 'login.html') {
                    res.writeHead(302, { 'Location': 'dashboard.html' });
                    res.end() 
                }
                
                else if ((result.dataSaved) && page == 'cadastro.html') {
                    res.end('<h1> Cadastro efetuado! </h1> <a href = "login.html">Voltar</a>')
                }
                
                else  {
                    res.writeHead(302, { 'Location': page });
                    res.end() 
                } 
                
                fetchResult = () => { result.dataSaved , result.error }
                return
                
            })
  
            */
        })
    }
    
    else {
        renderPage()
    }

})
       
addTable().then(isConnected => {

    if (!isConnected) {
        console.log('Não foi possível conectar ao banco de dados. O servidor não será iniciado. Certifique se as credenciais estão corretas.')
        return
    }

    console.log('Conexão com o banco de dados estabelecida. Tabela dados_clientes criada. Iniciando o servidor...');
    server.listen(8080, 'localhost', () => {
        console.log('Servidor rodando na porta 8080')
    })

})
