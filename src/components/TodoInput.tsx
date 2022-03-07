import styles from '../Todo.module.css';
import React, { useContext } from 'react';
import TodoContext from '../contexts/todo';

const TodoInput = () => {
  const { actions, state } = useContext(TodoContext);

  return (
    <div className={styles.input}>
      <form onSubmit={actions.onSubmit}>
        <input placeholder="할 일을 입력하세요" value={state.input} onChange={actions.onChange} />
        <button type="submit">추가</button>
      </form>
    </div>
  );
};

export default TodoInput;
