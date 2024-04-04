const http = require('http')

const loginPage = require('./login/html.js')
const registerPage = require('./cadastro/html.js')

const server = http.createServer((req, res) => {

    if (req.url === '/' || req.url === '/login.html') {
        res.writeHead(200, { 'Content-Type': 'text/html'})
        res.end(loginPage)
    }

    else if (req.url === '/cadastro.html') {
        res.writeHead(200, { 'Content-Type': 'text/html'})
        res.end(registerPage)
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Página não encontrada');
    }
    
});


server.listen(8080, 'localhost', () => {
    console.log('Servidor rodando na porta 8080');
});

