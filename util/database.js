const Sequelize = require('sequelize')
const username = 'anon'
const password = '123456'
const sequelize = new Sequelize('living', username, password, {
    dialect: 'mysql',
    host: '127.0.0.1'
})
module.exports = sequelize