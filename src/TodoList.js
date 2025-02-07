import React, { useState, useEffect } from 'react'; 
import { FaTrash, FaCheckCircle, FaCircle } from 'react-icons/fa';

function TodoList() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const toggleCompletion = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const clearAll = () => {
    setTodos([]);
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
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => toggleCompletion(index)}>
              {todo.completed ? (
                <FaCheckCircle style={{ color: '#61dafb' }} />
              ) : (
                <FaCircle style={{ color: '#bbb' }} />
              )}
              {todo.text}
            </span>
            <button onClick={() => removeTodo(index)}>
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
