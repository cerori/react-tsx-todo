import React from 'react';
import './App.css';
import TodosContainer from './containers/TodoContainer';

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

function App() {
  return <TodosContainer />;
}

export default App;
