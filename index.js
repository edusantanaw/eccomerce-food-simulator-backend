const express = require('express')
const app = express()
const cors = require('cors')
const Port  = process.env.PORT || 5000
const routes =require('./routes/routes')

app.use(cors({credentials: true, origin: 'http://127.0.0.1:5173'}))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', routes)

app.listen(Port, ()=> {
    console.log(`Servidor rodando na porta ${Port}`)
})