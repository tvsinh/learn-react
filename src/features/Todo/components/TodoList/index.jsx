import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './styles.scss';

TodoList.propTypes = {
  todoList: PropTypes.array,
  onTodoClick: PropTypes.func,
  onTodoDel: PropTypes.func,
};

TodoList.defaultProps = {
  todoList: [],
  onTodoClick: null,
  onTodoDel: null,
};

function TodoList({ todoList, onTodoClick, onTodoDel }) {
  const handleTodoClick = (todo, idx) => {
    if (!onTodoClick) return;

    onTodoClick(todo, idx);
  };
  const handleTodoDel = (todo, idx) => {
    if (!onTodoDel) return;

    onTodoDel(todo, idx);
  };

  return (
    <ul className="todo-list">
      {todoList.map((todo, idx) => (
        <div key={todo.id}>
          <li
            className={classnames({
              'todo-item': true,
              completed: todo.status === 'completed',
            })}
            onClick={() => handleTodoClick(todo, idx)}
          >
            {todo.title}
          </li>
          <button onClick={() => handleTodoDel(todo, idx)}>&#10006;</button>
        </div>
      ))}
    </ul>
  );
}

export default TodoList;
