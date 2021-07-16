import React, { useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import TodoList from '../../components/TodoList';
import queryString from 'query-string';
import { useEffect } from 'react';
import { useMemo } from 'react';
import TodoForm from '../../components/TodoForm';
import TodoFormEdit from 'features/TodoLocal/components/TodoFormEdit';
import { Button, Typography } from '@material-ui/core';

ListPage.propTypes = {};

function ListPage(props) {
  // const initTodoLists = [
  //   {
  //     title: 'Eat',
  //     status: 'new',
  //   },
  //   {
  //     title: 'Sleep',
  //     status: 'completed',
  //   },
  //   {
  //     title: 'Code',
  //     status: 'new',
  //   },
  // ];
  // localStorage.setItem('initTodoLists', JSON.stringify(initTodoList));

  const localTodoLists = JSON.parse(localStorage.getItem('localTodoLists'));
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const [todoList, setTodoList] = useState(localTodoLists || []);
  const [titleEdit, setTitleEdit] = useState('');
  const [idxEdit, setIdxEdit] = useState('');
  const [disableEdit, setDisableEdit] = useState(false);
  const [filteredStatus, setFilteredStatus] = useState(() => {
    const params = queryString.parse(history.location.search);
    //location.search: ?status=all
    //params: {status: "all"}
    return params.status || 'all';
  });

  useEffect(() => {
    const params = queryString.parse(location.search);
    setFilteredStatus(params.status || 'all');
  }, [location.search]);

  const handleTodoClick = (todo, idx) => {
    // clone current array to the new one
    const newTodoList = [...todoList];
    // toggle state
    newTodoList[idx] = {
      ...newTodoList[idx],
      status: newTodoList[idx].status === 'new' ? 'completed' : 'new',
    };
    // update todo list
    setTodoList(newTodoList);
    localStorage.setItem('localTodoLists', JSON.stringify(newTodoList));
  };
  const handleTodoDel = (todo, idx) => {
    // const { title } = todo;
    // const newTodoList = todoList.filter((todos) => todos.title !== title);
    // const newTodoList = todoList.filter((todos) => !todos.title.includes(title));
    // const a1 = todoList.slice(0, idx);
    // const a2 = todoList.slice(idx + 1, todoList.length);
    // const newTodoList = a1.concat(a2);
    // or
    // const newTodoList = [...a1, ...a2];
    let newTodoList = [...todoList];
    newTodoList.splice(idx, 1);
    // update todo list
    setTodoList(newTodoList);
    localStorage.setItem('localTodoLists', JSON.stringify(newTodoList));
  };

  const handleTodoEdit = (todo, idx) => {
    setTitleEdit(todo.title);
    setIdxEdit(idx);
    setDisableEdit(true);
  };
  const handleEditSubmit = (values) => {
    const newTodoList = [...todoList];
    newTodoList[idxEdit] = {
      ...newTodoList[idxEdit],
      title: values.title,
    };
    setTodoList(newTodoList);
    localStorage.setItem('localTodoLists', JSON.stringify(newTodoList));
    setTitleEdit('');
    setIdxEdit('');
    setDisableEdit(false);
  };
  const handleCancelClick = () => {
    setIdxEdit('');
    setTitleEdit('');
    setDisableEdit(false);
  };

  const handleShowAllClick = () => {
    // setFilteredStatus('all');
    const queryParams = { status: 'all' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const handleShowCompletedClick = () => {
    // setFilteredStatus('completed');
    const queryParams = { status: 'completed' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const handleShowNewClick = () => {
    // setFilteredStatus('new');
    const queryParams = { status: 'new' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const renderedTodoList = useMemo(() => {
    return todoList.filter((todo) => filteredStatus === 'all' || filteredStatus === todo.status);
  }, [todoList, filteredStatus]);

  const handleTodoFormSubmit = (values) => {
    const newTodo = {
      // id: todoList.length + 1,
      title: values.title,
      status: 'new',
    };

    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
    localStorage.setItem('localTodoLists', JSON.stringify(newTodoList));
  };
  const handleTodoLocal = () => {
    history.push('/todos');
  };

  return (
    <div>
      <Typography style={{ textAlign: 'center' }}>
        You are using Todo APP saved to local storage in your PC. Visit Todo APP Online here.
        <Button color="primary" onClick={handleTodoLocal}>
          Todo Online
        </Button>
      </Typography>
      <h3 style={{ marginBottom: '10px' }}>What Todo</h3>
      {titleEdit ? (
        <TodoFormEdit
          onSubmit={handleEditSubmit}
          onClick={handleCancelClick}
          titleEdit={titleEdit}
        />
      ) : (
        <TodoForm onSubmit={handleTodoFormSubmit} />
      )}

      <h3>Todo List</h3>
      {renderedTodoList.length ? (
        <TodoList
          todoList={renderedTodoList}
          onTodoClick={handleTodoClick}
          onTodoDel={handleTodoDel}
          onTodoEdit={handleTodoEdit}
          disableEdit={disableEdit}
        />
      ) : (
        <p>Todo empty. Select Show Opiton or Add new todo on form.</p>
      )}

      <div>
        <Button
          onClick={handleShowAllClick}
          style={{ marginRight: '5px', lineHeight: '1.4' }}
          variant="outlined"
          color="primary"
        >
          Show All
        </Button>
        <Button
          onClick={handleShowCompletedClick}
          style={{ marginRight: '5px', lineHeight: '1.4' }}
          variant="outlined"
          color="primary"
        >
          Show Completed
        </Button>
        <Button
          onClick={handleShowNewClick}
          variant="outlined"
          color="primary"
          style={{ lineHeight: '1.4' }}
        >
          Show New
        </Button>
      </div>
    </div>
  );
}

export default ListPage;
