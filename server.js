const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// Rota para criar um novo usuário
app.post('/usuarios', (req, res) => {
    const { nome, telefone, data_nascimento, cpf, email, senha } = req.body;
    const query = `
        INSERT INTO Usuario (Nome, Telefone, Data_nascimento, CPF, Email, Senha)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [nome, telefone, data_nascimento, cpf, email, senha], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao criar usuário.');
        } else {
            res.send('Usuário criado com sucesso!');
        }
    });
});

// Rota para listar usuários
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM Usuario', (err, results) => {
        if (err) {
            res.status(500).send('Erro ao listar usuários.');
        } else {
            res.json(results);
        }
    });
});

// Rota para deletar um usuário pelo ID
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Usuario WHERE ID = ?`;
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao excluir usuário.');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Usuário não encontrado.');
        } else {
            res.send('Usuário excluído com sucesso!');
        }
    });
});

// Rota para criar um novo gasto
app.post('/gastos', (req, res) => {
    const { valor, data, descricao, id_categoria, id_usuario } = req.body;
    const query = `
        INSERT INTO Gasto (Valor, Data, Descricao, ID_Categoria, ID_Usuario)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(query, [valor, data, descricao, id_categoria, id_usuario], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao criar gasto.');
        } else {
            res.send('Gasto registrado com sucesso!');
        }
    });
});

// Rota para listar usuários
app.get('/gastos', (req, res) => {
    db.query('SELECT * FROM Gasto', (err, results) => {
        if (err) {
            res.status(500).send('Erro ao listar usuários.');
        } else {
            res.json(results);
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
