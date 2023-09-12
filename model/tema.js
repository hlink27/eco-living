const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Tema = sequelize.define('tema', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: Sequelize.STRING,
    progresso: Sequelize.INTEGER
}, {paranoid: true})
module.exports = Tema