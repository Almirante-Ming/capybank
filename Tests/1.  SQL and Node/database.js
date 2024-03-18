const Sequelize = require('sequelize') // Importa biblioteca sequelize

// Necessário criar o database previmente no servidor MYSQL

// new Sequelize('database', 'user', 'password') -> Substituir pelos seus dados correspondentes
const sequelize = new Sequelize('example2', 'mrl@', 'password', {
    host: 'localhost',
    dialect: 'mysql'
})

// Verifica se o banco foi autenticado, exibe sucesso
sequelize.authenticate()
.then(function() {
    console.log('Sucesso')
})

module.exports = sequelize // Exporta para fora