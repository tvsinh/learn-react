import { Button, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import TodoForm from '../../components/TodoForm';
import TodoList from '../../components/TodoList';
import todosApi from './../../../../api/todoApi';
import TodoFormEdit from './../../components/TodoFormEdit/index';

const useStyles = makeStyles((theme) => ({
  root: {},
  loading: {
    display: 'flex',
    marginTop: '45vh',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  button: {
    marginRight: '5px',
    lineHeight: '1.4',
  },
}));

function ListPage() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reLoad, setReLoad] = useState(true);
  const [titleEdit, setTitleEdit] = useState('');
  const [idEdit, setIDEdit] = useState('');
  const [disableEdit, setDisableEdit] = useState(false);

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      status: params.status,
    };
  }, [location.search]);

  useEffect(() => {
    if (reLoad) {
      (async () => {
        try {
          const todos = await todosApi.getAll(queryParams);
          setTodoList(todos);
        } catch (error) {
          console.log('Failed to fetch todos: ', error);
        }
        setReLoad(false);
        setLoading(false);
      })();
    }
  }, [queryParams, reLoad]);

  const handleTodoClick = async (todo) => {
    const newTodo = {
      id: todo.id,
      status: todo.status === 'new' ? 'completed' : 'new',
    };
    await todosApi.update(newTodo);
    setReLoad(true);
  };

  const handleTodoDel = async (todo) => {
    await todosApi.remove(todo.id);
    setReLoad(true);
  };
  const handleTodoEdit = (todo) => {
    setTitleEdit(todo.title);
    setIDEdit(todo.id);
    setDisableEdit(true);
    // setReLoad(true);
  };
  const handleEditSubmit = async (values) => {
    const newTodo = {
      id: idEdit,
      title: values.title,
    };
    await todosApi.update(newTodo);
    setTitleEdit('');
    setIDEdit('');
    setDisableEdit(false);
    setReLoad(true);
  };
  const handleCancelClick = () => {
    setIDEdit('');
    setTitleEdit('');
    setDisableEdit(false);
    setReLoad(true);
  };

  const handleShowAllClick = () => {
    history.push({
      pathname: match.path,
    });
    setReLoad(true);
  };

  const handleShowCompletedClick = () => {
    const queryParams = { status: 'completed' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
    setReLoad(true);
  };

  const handleShowNewClick = () => {
    const queryParams = { status: 'new' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
    setReLoad(true);
  };

  const handleTodoFormSubmit = async (values) => {
    // const response = await todosApi.add(values);
    await todosApi.add(values);
    setReLoad(true);
  };
  const handleTodoLocal = () => {
    history.push('/todo');
  };

  return (
    <>
      {loading ? (
        <CircularProgress className={classes.loading} />
      ) : (
        <div>
          <Typography style={{ textAlign: 'center' }}>
            You are using Todo APP saved to my database(MongoDB Atlas). Visit Todo APP Local here
            <Button color="primary" onClick={handleTodoLocal}>
              Todo Local
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
          {todoList.length ? (
            <TodoList
              todoList={todoList}
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
              className={classes.button}
              variant="outlined"
              color="primary"
            >
              Show All
            </Button>
            <Button
              onClick={handleShowCompletedClick}
              className={classes.button}
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
      )}
    </>
  );
}

export default ListPage;
