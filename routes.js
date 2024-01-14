import express from 'express'
import app from "./config/config.js";
import connection from "./models/database.js";
import Post from './post/post.js';
import fetchIp from './ip/fetchIp.js';

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('css'))

app.get('/', (req, res)=>{
    fetch("https://api.ipify.org/?format=json").then(response=>{
        response.json().then(data=>{
            connection.query(`SELECT * FROM users WHERE ip = '${data['ip']}'`, (results, fields)=>{
                if(fields[0]['ip'] === data['ip']){
                    // { status: success }
                    res.redirect(`/${fields[0]['nome']}`)
                } else {
                    // { status: error }
                    res.redirect('/cadastrar')
                }
            })
        })
    })
    // message: success
})

app.get('/:nome', (req, res)=>{
    const nome = req.params.nome
    console.log(nome)
    res.json({
        user: nome
    })
})