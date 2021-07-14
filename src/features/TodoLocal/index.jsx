import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import ListPage from './pages/ListPage';

TodoLocalFeature.propTypes = {};

function TodoLocalFeature(props) {
  const match = useRouteMatch();

  return (
    <div style={{ margin: '6vh 20vw', height: 'auto' }}>
      <Switch>
        <Route path={match.path} component={ListPage} exact />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default TodoLocalFeature;
