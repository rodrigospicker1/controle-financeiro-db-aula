const mysql = require('mysql2');

// Configuração da conexão
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'controlefinanceiro', 
    port: 3306          
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conexão bem-sucedida com o MySQL!');
    }
});

module.exports = connection;
