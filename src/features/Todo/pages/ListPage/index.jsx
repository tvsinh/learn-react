import React, { useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import TodoList from '../../components/TodoList';
import queryString from 'query-string';
import { useEffect } from 'react';
import { useMemo } from 'react';
import TodoForm from '../../components/TodoForm';

ListPage.propTypes = {};

function ListPage(props) {
  // const initTodoLists = [
  //   {
  //     id: 1,
  //     title: 'Eat',
  //     status: 'new',
  //   },
  //   {
  //     id: 2,
  //     title: 'Sleep',
  //     status: 'completed',
  //   },
  //   {
  //     id: 3,
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
      id: todoList.length + 1,
      title: values.title,
      status: 'new',
    };

    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
    localStorage.setItem('localTodoLists', JSON.stringify(newTodoList));
  };
  if (todoList.length) {
    return (
      <div>
        <h3>What to do</h3>
        <TodoForm onSubmit={handleTodoFormSubmit} />

        <h3>Todo List</h3>
        <TodoList todoList={renderedTodoList} onTodoClick={handleTodoClick} />

        <div>
          <button onClick={handleShowAllClick}>Show All</button>
          <button onClick={handleShowCompletedClick}>Show Completed</button>
          <button onClick={handleShowNewClick}>Show New</button>
        </div>
      </div>
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
