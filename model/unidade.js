const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Unidade = sequelize.define('unidade', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: Sequelize.STRING,
    img: Sequelize.STRING
}, {paranoid: true})
module.exports = Unidade