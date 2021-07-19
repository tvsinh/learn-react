import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './styles.scss';
import checkEmptyImg from '../../Img/check.svg';
import successImg from '../../Img/success.svg';
import { Button } from '@material-ui/core';

TodoList.propTypes = {
  todoList: PropTypes.array,
  onTodoClick: PropTypes.func,
  onTodoDel: PropTypes.func,
  onTodoEdit: PropTypes.func,
  disableEdit: PropTypes.bool,
};

function TodoList({ todoList = [], onTodoClick, onTodoDel, onTodoEdit, disableEdit }) {
  const handleTodoClick = (todo, idx) => {
    if (!onTodoClick) return;
    onTodoClick(todo, idx);
  };
  const handleTodoDel = (todo, idx) => {
    if (!onTodoDel) return;
    onTodoDel(todo, idx);
  };
  const handleTodoEdit = (todo, idx) => {
    if (!onTodoEdit) return;
    onTodoEdit(todo, idx);
  };

  return (
    <ul className="todo-list">
      {todoList.map((todo, idx) => (
        <div key={idx}>
          <li
            className={classnames({
              'todo-item': true,
              completed: todo.status === 'completed',
            })}
            onClick={() => handleTodoClick(todo, idx)}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {todo.status === 'new' && <img src={checkEmptyImg} alt="checkimg" />}
            {todo.status === 'completed' && <img src={successImg} alt="checkimg" />}

            <p>{todo.title}</p>
          </li>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleTodoEdit(todo, idx)}
            disabled={disableEdit}
          >
            &#9998;
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleTodoDel(todo, idx)}
            disabled={disableEdit}
          >
            &#10006;
          </Button>
        </div>
      ))}
    </ul>
  );
}

export default TodoList;
