const express = require('express')
const app = require("./config/config.js");
const connection = require("./models/database.js")
const User = require('./users/user.js');
const Post = require('./post/post.js')
const exbhs = require('express-handlebars')
const path = require('path')
const { marked } = require("marked")
const Comentario = require("./comentarios/comentarios.js")
app.engine('handlebars', exbhs.engine({ defaultLayout: 'main', layoutsDir: path.join(__dirname + '/views/layouts') }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname + "/views"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())



app.get("/:nome/publicar", (req, res)=>{
    const nome = req.params.nome
    res.render('post/publicar', { nome: nome })
})
app.post("/:nome/publicar", (req, res)=>{
    const nome = req.params.nome
    const titulo = req.body.titulo
    const post = marked(req.body.post)
    const fonte = req.body.fonte
    console.log(post)
    Post.create({
        nome: nome,
        titulo: titulo,
        post: post,
        dataPost: Date(),
        fonte: fonte
    })
})

app.get('/:nome/:id', (req, res)=>{
    const id = req.params.id
    const nome = req.params.nome
    connection.query(`SELECT * FROM railway.posts WHERE id = '${id}'`, (results, fields)=>{
        console.log(fields)
        res.render('post/post', { id: id, nome: nome, fields: fields })
    })
})

app.get('/:nome/:id/comentar', (req, res)=>{
    const nome = req.params.nome
    const id = req.params.id
    res.render('post/comentar', { id: id, nome: nome })
})

app.post('/:nome/:id/comentar', (req, res)=>{
    const id = req.params.id
    const nome = req.params.nome
    const comentario = req.body.comentario
    Comentario.create({
        idpost: id,
        nome: nome,
        comentario: comentario,
        dataComentario: Date()
    })
    res.render('post/comentar', { id: id, nome: nome })
})

app.get('/', (req, res)=>{
    fetch("http://ip-api.com/json/").then(response=>{
        response.json().then(data=>{
            User.findOne({ where: { ip: data["query"] } }).then(rows=>{
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

app.get('/login', (req, res)=>{
    res.render('login')
})

app.post('/login', (req, res)=>{
    // function onClick(){
    //     const email = req.body.email
    //     const senha = req.body.senha
    //     console.log(email)
    //     User.findOne({ where: { email: email, senha: senha} }).then(result=>{
    //         if(result === null || result === undefined){
    //             const validationMsg = `
    //             <div class="alert alert-danger" role="alert">
    //                 <p class="form-text text-muted">Conta criada com sucesso <a href="/">Clique aqui para entrar na sua conta</a></p>
    //             </div>
    //             `
    //             res.render('login', {validationMsg:validationMsg})
    //         }
    //     })
    // }
    const email = req.body.email
    console.log(email)
    User.findOne({ where: { email: email } }).then(user=>{
        try{
            if(user['email'] === email){
                fetch("https://api.ipify.org/?format=json").then((response)=>{
                    response.json().then((data)=>{
                        User.update({ ip: data['ip'] }, { where: { id: user['id'] } })
                        res.redirect('/')
                    })
                })
            }
        }catch{
            res.redirect('/login')
        }
    })
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
        fetch("https://api.ipify.org/?format=json").then(response=>{
            response.json().then(ip=>{
                if(ip){
                    User.create({
                        nome: nome,
                        email: email,
                        senha: senha,
                        descricao: descricao,
                        ip: ip["ip"]
                    })
                }
            })
        })
    }
    const nomeFetch = req.body.nome
    User.findOne({ where: { nome: nomeFetch } }).then(fetchone=>{
        const validationMsg = `
        <div class="alert alert-primary" role="alert">
            <p class="form-text text-muted">Conta criada com sucesso <a href="/">Clique aqui para entrar na sua conta</a></p>
        </div>
        `
        res.render('cadastro', { onclick: onclick(), validationMsg: validationMsg })
    })
})

app.get('/termos-de-uso', (req, res)=>{
    res.render('termos')
})
app.get("/:nome", (req, res)=>{
    const nome = req.params.nome
    const nomeUser = req.params.nome
    connection.query(`SELECT * FROM railway.posts`, (results, fields)=>{
        console.log(fields)
        res.render('home', { nome: nome, nomeUser: nomeUser, posts: fields })
    })
    
})
