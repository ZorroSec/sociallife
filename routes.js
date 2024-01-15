import express from 'express'
import app from "./config/config.js";
import connection from "./models/database.js";
import User from './users/user.js';
import Post from './post/post.js';
import { engine } from 'express-handlebars';

app.engine('handlebars', engine({ defaultLayout: 'main', layoutsDir: 'views/layouts' }));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res)=>{
    fetch("https://api.ipify.org/?format=json").then(response=>{
        response.json().then(data=>{
            User.findOne({ where: { ip: data["ip"] } }).then(rows=>{
                if(rows === null || rows === undefined){
                    res.redirect('/cadastro')
                }else{
                    res.redirect(`/${rows['nome']}`)
                }
            })
        })
    })
    // message: success
})


app.route('/cadastro').get((req, res)=>{
    res.render('cadastro')
}).post((req, res)=>{
    function onclick(){
        const nome = req.body.nome
        const email = req.body.email
        const senha = req.body.senha
        const descricao = req.body.descricao
        const data = {
            nome: nome,
            email: email,
            senha: senha,
            descricao: descricao
        }
        console.log(data)
    }
    res.render('cadastro', { onclick: onclick() })
})

app.get("/:nome", (req, res)=>{
    res.render('home')
})