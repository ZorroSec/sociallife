const { Sequelize } = require('sequelize')
require('dotenv').config()
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    dialect: 'mysql',
    host: 'monorail.proxy.rlwy.net',
    port: 13464
})

module.exports = sequelize