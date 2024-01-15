// import { createConnection } from "mysql2";
// import { config } from "dotenv";
// config()
const { createConnection } = require('mysql2')
require('dotenv').config()
const connection = createConnection({
    host: 'monorail.proxy.rlwy.net',
    port: 13464,
    user: 'railway',
    password: process.env.MYSQL_PASSWORD,
    database: 'railway'
})

module.exports = connection