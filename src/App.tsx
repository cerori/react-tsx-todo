import React from 'react';
import './App.css';
import Todos from './components/Todos';

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

function App() {
  return <Todos />;
}

export default App;