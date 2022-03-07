import TodoItem from './TodoItem';
import styles from '../Todo.module.css';
import { TodoConsumer } from '../contexts/todo';

const TodoList = () => {
  return (
    <TodoConsumer>
      {({ actions, state }) => (
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
      )}
    </TodoConsumer>
  );
};

export default TodoList;
