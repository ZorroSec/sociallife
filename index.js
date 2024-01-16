const app = require('./config/config.js')
const express = require('express')
const Sequelize = require('sequelize')
const createConnection = require('mysql2')
const connection = require('./models/database.js')
const sequelize = require('./sequelize/sequelize.js')
const Post = require('./post/post.js')
const exbhs = require('express-handlebars')
const path = require('path')
const { marked } = require("marked")
require('./routes.js')
app.engine('handlebars', exbhs.engine({ defaultLayout: 'main', layoutsDir: path.join(__dirname + '/views/layouts') }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname + "/views"));


app.listen(3000, ()=>{
    console.log('Server listening in port 3000')
})