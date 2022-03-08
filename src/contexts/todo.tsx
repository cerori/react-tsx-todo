import { Todo } from '../App';
import React, { createContext, useCallback, useRef, useState } from 'react';

const CHANGE_TODO_INPUT = 'CHANGE_TODO_INPUT' as const;
const ADD_TODO = 'ADD_TODO' as const;
const TOGGLE_TODO_STATUS = 'TOGGLE_TODO_STATUS' as const;
const REMOVE_TODO = 'REMOVE_TODO' as const;
const CLEAR_ALL_TODOS = 'CLEAR_ALL_TODOS' as const;

export const changeTodoInput = (input: string) => ({
  type: CHANGE_TODO_INPUT,
  input,
});

export const clearAllTodos = () => ({
  type: CLEAR_ALL_TODOS,
});

interface TodoState {
  readonly todos: Todo[];
  readonly input: string;
}

interface TodoAction {
  readonly setTodos: (todos: Todo[]) => void;
  readonly onInsert: (text: string) => void;
  readonly onRemove: (id: number) => void;
  readonly onToggle: (id: number) => void;
  readonly onClearAll: () => void;
  readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

interface Context {
  readonly state: TodoState;
  readonly actions: TodoAction;
}

const TodoContext = createContext<Context>({
  state: { todos: [], input: '' },
  actions: {
    setTodos: (todos: Todo[]): void => {},
    onInsert: (text: string): void => {},
    onRemove: (id: number): void => {},
    onToggle: (id: number): void => {},
    onClearAll: (): void => {},
    onChange: (e: React.ChangeEvent<HTMLInputElement>): void => {},
    onSubmit: (e: React.FormEvent<HTMLFormElement>): void => {},
  },
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const TodoProvider = ({ children }: Props) => {
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

  const value = {
    state: { todos, input },
    actions: {
      setTodos,
      onInsert,
      onRemove,
      onToggle,
      onClearAll,
      onChange,
      onSubmit,
    },
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

const { Consumer: TodoConsumer } = TodoContext;

export { TodoProvider, TodoConsumer };

export default TodoContext;
