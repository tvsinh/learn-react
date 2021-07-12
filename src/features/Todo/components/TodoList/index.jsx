import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './styles.scss';

TodoList.propTypes = {
  todoList: PropTypes.array,
  onTodoClick: PropTypes.func,
  onTodoDel: PropTypes.func,
  onTodoEdit: PropTypes.func,
  disableEdit: PropTypes.bool,
};

function TodoList({ todoList = [], onTodoClick, onTodoDel, onTodoEdit, disableEdit }) {
  const handleTodoClick = (todo) => {
    if (!onTodoClick) return;
    onTodoClick(todo);
  };
  const handleTodoDel = (todo) => {
    if (!onTodoDel) return;
    onTodoDel(todo);
  };
  const handleTodoEdit = (todo) => {
    if (!onTodoEdit) return;
    onTodoEdit(todo);
  };

  return (
    <ul className="todo-list">
      {todoList.map((todo) => (
        <div key={todo.id}>
          <li
            className={classnames({
              'todo-item': true,
              completed: todo.status === 'completed',
            })}
            onClick={() => handleTodoClick(todo)}
          >
            {todo.title}
          </li>
          <button onClick={() => handleTodoEdit(todo)} disabled={disableEdit}>
            &#9998;
          </button>
          <button onClick={() => handleTodoDel(todo)}>&#10006;</button>
        </div>
      ))}
    </ul>
  );
}

export default TodoList;
