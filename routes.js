import express from 'express'
import app from "./config/config.js";
import connection from "./models/database.js";



app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('css'))

app.get('/', (rq, res)=>{
    res.json({
        message: 'Success'
    })
})