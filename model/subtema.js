const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Subtema = sequelize.define('subtema', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: Sequelize.STRING,
    sts: Sequelize.STRING,
    details: Sequelize.STRING
}, {paranoid: true})
module.exports = Subtema