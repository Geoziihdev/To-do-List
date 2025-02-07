import React from 'react';
import TodoList from './TodoList';  
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      <h2>Programar com Você</h2>
      <TodoList /> 
    </div>
  );
}

export default App;
