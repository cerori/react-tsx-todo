import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeTodoInput,
  addTodo,
  toggleTodoStatus,
  removeTodo,
  clearAllTodos,
  changeFilter,
} from '../modules/todos';
import Todos from '../components/Todos';
import { TodoState } from '../modules/todos';
import { Todo } from '../App';

const TodoContainer = () => {
  const { input, filter, todos } = useSelector((state: TodoState) => ({
    input: state.input,
    todos: state.todos,
    filter: state.filter,
  }));

  const dispatch = useDispatch();

  const onChangeInput = useCallback((input) => dispatch(changeTodoInput(input)), [dispatch]);
  const onInsert = useCallback((input) => dispatch(addTodo(input)), [dispatch]);
  const onToggle = useCallback((id) => dispatch(toggleTodoStatus(id)), [dispatch]);
  const onRemove = useCallback((id) => dispatch(removeTodo(id)), [dispatch]);
  const onClearAll = useCallback(() => dispatch(clearAllTodos()), [dispatch]);

  // 필터링 유형 변경 액션 디스패치 함수
  const onChangeFilter = useCallback((filter) => dispatch(changeFilter(filter)), [dispatch]);

  // 필터링 처리된 Todos 리스트 반환
  const getFilteredTodos = (todos: Todo[], filter: string) => {
    if (filter === 'ALL') {
      return todos;
    }

    // 미완료
    if (filter === 'A') {
      return todos.filter((todo) => {
        return todo.done === false;
      });
    }

    // 완료
    if (filter === 'B') {
      return todos.filter((todo) => {
        return todo.done === true;
      });
    }
  };

  const filteredTodos = getFilteredTodos(todos, filter);

  return (
    <Todos
      input={input}
      todos={filteredTodos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
      onClearAll={onClearAll}
      filter={filter}
      onChangeFilter={onChangeFilter}
    />
  );
};

export default TodoContainer;
