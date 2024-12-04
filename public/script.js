// Função para listar usuários ao clicar no botão "Atualizar Usuários"
document.getElementById('refreshUsuarios').addEventListener('click', async () => {
    listarUsuarios();
});

// Função para listar usuários
async function listarUsuarios() {
    const response = await fetch('/usuarios');
    const usuarios = await response.json();

    const lista = document.getElementById('usuarios');
    lista.innerHTML = '';

    usuarios.forEach((usuario) => {
        const item = document.createElement('li');
        item.textContent = `${usuario.Nome}`;

        const botaoDados = document.createElement('button');
        botaoDados.textContent = 'Dados';
        botaoDados.classList.add('dados-button');
        botaoDados.onclick = () => exibirDadosUsuario(usuario);

        const botaoDeleta = document.createElement('button');
        botaoDeleta.textContent = 'Deletar';
        botaoDeleta.classList.add('delete-button');
        botaoDeleta.onclick = () => deletarUsuario(usuario.ID);

        item.appendChild(botaoDados);
        item.appendChild(botaoDeleta);

        lista.appendChild(item);
    });
}

// Função para exibir os dados do usuário
function exibirDadosUsuario(usuario) {
    const detalhes = `
        ID: ${usuario.ID}
        Nome: ${usuario.Nome}
        Telefone: ${usuario.Telefone || 'Não informado'}
        Data de Nascimento: ${usuario.Data_nascimento || 'Não informado'}
        CPF: ${usuario.CPF || 'Não informado'}
        Email: ${usuario.Email || 'Não informado'}
    `;
    alert(detalhes);
}

// Função para deletar usuário
async function deletarUsuario(id) {
    const confirmacao = confirm('Tem certeza que deseja excluir este usuário?');
    if (confirmacao) {
        const response = await fetch(`/usuarios/${id}`, { method: 'DELETE' });
        if (response.ok) {
            alert('Usuário excluído com sucesso!');
            listarUsuarios();
        } else {
            alert('Erro ao excluir o usuário.');
        }
    }
}

// Função para cadastrar usuário
document.getElementById('formUsuario').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const response = await fetch('/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        alert('Usuário cadastrado com sucesso!');
    } else {
        alert('Erro ao cadastrar usuário.');
    }
});

// Evento para cadastrar um gasto
document.getElementById('formGasto').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const gasto = Object.fromEntries(formData.entries());

        const response = await fetch('/gastos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gasto),
        });

        if (response.ok) {
            alert('Gasto cadastrado com sucesso!');
        } else {
            alert('Erro ao cadastrar gasto.');
        }
});

// Rota para listar todos os gastos
app.get('/gastos', (req, res) => {
    const query = `
        SELECT Gasto.ID, Gasto.Valor, Gasto.Data, Gasto.Descricao, Categoria.Nome as Categoria, Usuario.Nome as Usuario
        FROM Gasto
        LEFT JOIN Categoria ON Gasto.ID_Categoria = Categoria.ID
        LEFT JOIN Usuario ON Gasto.ID_Usuario = Usuario.ID
    `;

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao listar gastos.');
        } else {
            res.json(results);
        }
    });
});

document.getElementById('refreshGastos').addEventListener('click', async () => {
    listarGastos();
});

// Função para listar gastos
async function listarGastos() {
    try {
        const response = await fetch('/gastos'); // Faz uma requisição para o backend
        const gastos = await response.json();

        const lista = document.getElementById('listaGastos'); // Seleciona o <ul> de gastos
        lista.innerHTML = ''; // Limpa a lista antes de adicionar os novos itens

        // Adiciona cada gasto na lista
        gastos.forEach((gasto) => {
            const item = document.createElement('li');
            item.innerHTML = `
                <strong>Valor:</strong> R$${gasto.Valor.toFixed(2)} |
                <strong>Data:</strong> ${new Date(gasto.Data).toLocaleDateString()} |
                <strong>Descrição:</strong> ${gasto.Descricao} |
                <strong>Categoria:</strong> ${gasto.Categoria || 'Sem Categoria'} |
                <strong>Usuário:</strong> ${gasto.Usuario || 'Sem Usuário'}
            `;
            lista.appendChild(item);
        });
    } catch (err) {
        console.error('Erro ao listar gastos:', err);
        alert('Erro ao listar gastos.');
    }
}

// Deixa apenas colocar 11 números no telefone
document.addEventListener('DOMContentLoaded', () => {
    const verificaTelefone = document.querySelector('input[name="telefone"]');

    verificaTelefone.addEventListener('input', (event) => {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');

        if (event.target.value.length > 11) {
            event.target.value = event.target.value.slice(0, 11);
        }
    });
});

// Deixa apenas colocar 11 números no CPF
document.addEventListener('DOMContentLoaded', () => {
    const verificaCpf = document.querySelector('input[name="cpf"]');

    verificaCpf.addEventListener('input', (event) => {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');

        if (event.target.value.length > 11) {
            event.target.value = event.target.value.slice(0, 11);
        }
    });
});