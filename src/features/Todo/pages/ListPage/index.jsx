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
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  loading: {
    display: 'flex',
    marginTop: '50%',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
}));

ListPage.propTypes = {};

function ListPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reLoad, setReLoad] = useState(false);
  const [titleEdit, setTitleEdit] = useState('');
  const [idEdit, setIDEdit] = useState('');
  const [disableEdit, setDisableEdit] = useState(false);

  // const [filteredStatus, setFilteredStatus] = useState(() => {
  //   const params = queryString.parse(history.location.search);
  //   return params.status || 'all';
  // });
  // const renderedTodoList = useMemo(() => {
  //   return todoList.filter((todo) => filteredStatus === 'all' || filteredStatus === todo.status);
  // }, [todoList, filteredStatus]);
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      status: params.status,
    };
  }, [location.search]);

  useEffect(() => {
    (async () => {
      try {
        const todos = await todosApi.getAll(queryParams);
        setTodoList(todos);
        console.log(todos);
        // if (todos.length === 0) {
        //   window.location.reload();
        // }
      } catch (error) {
        console.log('Failed to fetch todos: ', error);
      }
      setReLoad(false);
      setLoading(false);
    })();
  }, [queryParams, reLoad]);

  const handleTodoClick = (todo) => {
    const newTodo = {
      id: todo.id,
      status: todo.status === 'new' ? 'completed' : 'new',
    };
    todosApi.update(newTodo);
    setReLoad(true);
  };

  const handleTodoDel = (todo) => {
    todosApi.remove(todo.id);
    setReLoad(true);
  };
  const handleTodoEdit = (todo) => {
    setTitleEdit(todo.title);
    setIDEdit(todo.id);
    setDisableEdit(true);
    // setReLoad(true);
  };
  const handleEditSubmit = (values) => {
    // console.log('listpage:', values, idEdit);
    const newTodo = {
      id: idEdit,
      title: values.title,
    };
    todosApi.update(newTodo);
    setTitleEdit('');
    setIDEdit('');
    setReLoad(true);
    setDisableEdit(false);
  };
  const handleCancelClick = () => {
    setTitleEdit('');
    setIDEdit('');
    setReLoad(true);
    setDisableEdit(false);
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
  };

  const handleShowNewClick = () => {
    const queryParams = { status: 'new' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const handleTodoFormSubmit = (values) => {
    // console.log(values);
    todosApi.add(values);
    setReLoad(true);
  };

  if (todoList.length) {
    return (
      <>
        {loading ? (
          <CircularProgress className={classes.loading} />
        ) : (
          <div>
            <h3>What to do</h3>
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
            <TodoList
              todoList={todoList}
              onTodoClick={handleTodoClick}
              onTodoDel={handleTodoDel}
              onTodoEdit={handleTodoEdit}
              disableEdit={disableEdit}
            />

            <div>
              <button onClick={handleShowAllClick}>Show All</button>
              <button onClick={handleShowCompletedClick}>Show Completed</button>
              <button onClick={handleShowNewClick}>Show New</button>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return (
      <div>
        <h3>What to do</h3>
        <TodoForm onSubmit={handleTodoFormSubmit} />
        <p>To do empty. Add new to do on form.</p>
      </div>
    );
  }
}

export default ListPage;
