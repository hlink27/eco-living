const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    is_admin: Sequelize.INTEGER,
    os: Sequelize.STRING
}, {paranoid: true})
module.exports = User