import TodoItem from './TodoItem';
import styles from '../Todo.module.css';
import TodoContext from '../contexts/todo';
import { useContext } from 'react';

const TodoList = () => {
  const { actions, state } = useContext(TodoContext);

  return (
    <div className={styles.list}>
      {state.todos.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onRemove={actions.onRemove}
          onToggle={actions.onToggle}
        />
      ))}
    </div>
  );
};

export default TodoList;
