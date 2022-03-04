const mysql = require('mysql2')

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'golab'
})

module.exports = conexao