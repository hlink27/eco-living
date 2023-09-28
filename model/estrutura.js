const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Estrutura = sequelize.define('estrutura', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: Sequelize.STRING
}, {paranoid: true})
module.exports = Estrutura