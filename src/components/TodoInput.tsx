import styles from '../Todo.module.css';
import React from 'react';
import { TodoConsumer } from '../contexts/todo';

const TodoInput = () => {
  return (
    <TodoConsumer>
      {({ actions, state }) => (
        <div className={styles.input}>
          <form onSubmit={actions.onSubmit}>
            <input
              placeholder="할 일을 입력하세요"
              value={state.input}
              onChange={actions.onChange}
            />
            <button type="submit">추가</button>
          </form>
        </div>
      )}
    </TodoConsumer>
  );
};

export default TodoInput;
