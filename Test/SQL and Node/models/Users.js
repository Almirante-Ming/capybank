const Sequelize = require('sequelize') // importa biblioteca sequelize
const db = require('../database') // importa o banco presente no script database.js

// define é um método de Sequelize. Ele cria a coluna na tabela
const User = db.define('dadosCliente', {
    // Um ID incremental (1,2,3,4,5...)
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, 
        allowNull: false,
        primaryKey: true
    },
    
    nome: {
        type: Sequelize.STRING, 
    },

    senha: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

})

User.sync() // Essa função certifica que a tabela dadosClientes seja criada, caso ela não exista. Caso ela exista, os dados são inseridos normalmente

module.exports = User // Exportando para 'fora'