const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Configuração de middlewares
app.use(cors());
app.use(bodyParser.json());

// Rota de exemplo
app.get('/api', (req, res) => {
  res.send('Olá do Backend!');
});

// Simulação de um banco de dados (array em memória)
let todos = [
  { id: 1, text: 'Estudar Node.js', completed: false },
  { id: 2, text: 'Criar API REST', completed: true },
];

// Rota para obter todas as tarefas
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Rota para adicionar uma nova tarefa
app.post('/todos', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Texto da tarefa é obrigatório' });
  }
  const newTodo = { id: todos.length + 1, text, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Rota para excluir uma tarefa
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== parseInt(id));
  res.json({ message: 'Tarefa removida com sucesso' });
});


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
