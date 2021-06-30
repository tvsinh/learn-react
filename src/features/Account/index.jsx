import React from 'react';
import Header from 'components/Header';
import { Box } from '@material-ui/core';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import AccountPage from './../Account/pages/AccountPage';

AccountFaeture.propTypes = {};

function AccountFaeture() {
  const match = useRouteMatch();

  return (
    <>
      <Header />
      <Box>
        <Switch>
          <Route path={match.url} exact component={AccountPage} />
        </Switch>
      </Box>
    </>
  );
}

export default AccountFaeture;
