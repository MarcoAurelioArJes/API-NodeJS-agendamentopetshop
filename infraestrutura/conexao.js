const mysql = require('mysql');

// Adicionando biblioteca dotenv
require('dotenv/config');

const conexao = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

module.exports = conexao;