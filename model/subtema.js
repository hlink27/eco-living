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
    details: Sequelize.STRING,
    dateIn: Sequelize.DATEONLY,
    dateFi: Sequelize.DATEONLY,
    resp: Sequelize.STRING,
    tel:Sequelize.STRING,
}, {paranoid: true})
module.exports = Subtema