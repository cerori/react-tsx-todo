import React from 'react';
import styles from '../Todo.module.css';

interface Props {
  readonly filter: string;
  readonly onChangeFilter: (filter: string) => void;
}

const TodoFilter = ({ filter, onChangeFilter }: Props) => {
  const handlerFilter = (e: React.ChangeEvent<HTMLInputElement>) => onChangeFilter(e.target.value);

  return (
    <div className={styles.filter}>
      <input type="radio" value="ALL" checked={filter === 'ALL'} onChange={handlerFilter} />
      전체
      <input type="radio" value="A" checked={filter === 'A'} onChange={handlerFilter} />
      미완료
      <input type="radio" value="B" checked={filter === 'B'} onChange={handlerFilter} />
      완료
    </div>
  );
};

export default TodoFilter;
