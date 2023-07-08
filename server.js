const express = require('express')
const app = express()
const db = require('./config/connection')
const PORT = 3001
app.use(express.json())
app.use(express.urlencoded({extended:true}))


db.once('open',()=>{
    app.listen(PORT, ()=>{
        console.log('App is listening');
    })
})