import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importando o axios
import { FaTrash, FaCheckCircle, FaCircle } from 'react-icons/fa';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Carregar todos os todos do backend ao iniciar o componente
  useEffect(() => {
    axios.get('http://localhost:5000/todos') // Substitua pela URL da sua API
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar os todos:', error);
      });
  }, []);

  // Adicionar uma nova tarefa
  const addTodo = () => {
    if (newTodo.trim() !== '') {
      axios.post('http://localhost:5000/todos', { text: newTodo, completed: false })
        .then(response => {
          setTodos([...todos, response.data]);
          setNewTodo('');
        })
        .catch(error => {
          console.error('Erro ao adicionar a tarefa:', error);
        });
    }
  };

  // Remover uma tarefa
  const removeTodo = (id) => {
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(error => {
        console.error('Erro ao remover a tarefa:', error);
      });
  };

  // Alterar o status de conclusão de uma tarefa
const toggleCompletion = (id) => {
  // Encontrando a tarefa localmente
  const todo = todos.find(todo => todo.id === id);
  
  // Atualizando o estado local primeiro, para refletir imediatamente a mudança
  setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ));

  // Atualizando o backend
  axios.put(`http://localhost:5000/todos/${id}`, { ...todo, completed: !todo.completed })
    .catch(error => {
      console.error('Erro ao atualizar a tarefa no backend:', error);
      // Se algo der errado no backend, podemos reverter o estado
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    });
};


  // Limpar todas as tarefas
  const clearAll = () => {
    axios.delete('http://localhost:5000/todos') // Certifique-se de que a API suporta essa rota
      .then(() => {
        setTodos([]);
      })
      .catch(error => {
        console.error('Erro ao limpar todas as tarefas:', error);
      });
  };

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Digite uma nova tarefa"
      />
      <button onClick={addTodo}>Adicionar</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => toggleCompletion(todo.id)}>
              {todo.completed ? (
                <FaCheckCircle style={{ color: '#61dafb' }} />
              ) : (
                <FaCircle style={{ color: '#bbb' }} />
              )}
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>

      <div>
        <p>{completedCount} {completedCount === 1 ? 'tarefa concluída' : 'tarefas concluídas'}</p>
        {todos.length > 0 && (
          <button className="clear-button" onClick={clearAll}>Limpar Tudo</button>
        )}
      </div>
    </div>
  );
}

export default TodoList;
