// Função auxiliar que recebe os dados do servidor

function getBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => { body += chunk.toString() });
        req.on('end', () => { resolve(body); });
        req.on('error', (err) => { reject(err); });
    });
}


module.exports = { getBody }