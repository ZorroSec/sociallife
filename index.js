import app from './config/config.js'
import express from 'express'
import { Sequelize } from 'sequelize'
import { createConnection } from 'mysql2'
import connection from './models/database.js'
import Sequelize from 'sequelize'
import sequelize from './sequelize/sequelize.js'
import './routes.js'

sequelize.sync(()=>{ console.log('Mysql database listenning in port 3306') })
app.listen(3000, ()=>{
    console.log('Server listening in port 3000')
})