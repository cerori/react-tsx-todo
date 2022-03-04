import TodoHeader from './TodoHeader';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoFooter from './TodoFooter';
import { useState, useRef, useCallback } from 'react';
import { Todo } from '../App';

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const nextId = useRef(1);

  const onInsert = useCallback((text: string) => {
    const todo = {
      id: nextId.current,
      text,
      done: false,
    };

    setTodos((todos) => todos.concat(todo));

    nextId.current += 1;
  }, []);

  const onRemove = useCallback((id: number) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);

  const onToggle = useCallback((id: number) => {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );
  }, []);

  const onClearAll = useCallback(() => {
    setTodos(() => []);
  }, []);

  const onChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      onInsert(input);
      setInput('');
    },
    [onInsert, input],
  );

  return (
    <div>
      <TodoHeader />
      <TodoInput input={input} onChange={onChange} onSubmit={onSubmit} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      <TodoFooter onClearAll={onClearAll} />
    </div>
  );
};

export default Todos;
