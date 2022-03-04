const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const roteador = require('./routes/fornecedores')

app.use(bodyParser.json())

app.use('/api/fornecedores', roteador)

app.listen(config.get('api.port'), () => {
    console.log('Servidor ON!')
})