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
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {todo.status === 'new' && (
              <img
                src={checkEmptyImg}
                alt="checkimg"
                style={{ width: '30px', height: '30px', marginRight: '5px' }}
              />
            )}
            {todo.status === 'completed' && (
              <img
                src={successImg}
                alt="checkimg"
                style={{ width: '30px', height: '30px', marginRight: '5px' }}
              />
            )}

            <p style={{ fontSize: '18px', fontWeight: '400', margin: '8px 0' }}>{todo.title}</p>
          </li>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleTodoEdit(todo)}
            disabled={disableEdit}
            style={{ minWidth: '35px', maxHeight: '30px', padding: '0', lineHeight: '1.4' }}
          >
            &#9998;
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleTodoDel(todo)}
            disabled={disableEdit}
            style={{
              minWidth: '35px',
              maxHeight: '30px',
              padding: '0',
              lineHeight: '1.4',
              marginRight: '10px',
            }}
          >
            &#10006;
          </Button>
        </div>
      ))}
    </ul>
  );
}

export default TodoList;
