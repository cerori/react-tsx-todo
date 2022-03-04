import styles from '../Todo.module.css';
import { TodoConsumer } from '../contexts/todo';

const TodoFooter = () => {
  return (
    <TodoConsumer>
      {(value) => (
        <div className={styles.footer}>
          <button onClick={() => value.actions.onClearAll()}>모두 삭제</button>
        </div>
      )}
    </TodoConsumer>
  );
};

export default TodoFooter;
