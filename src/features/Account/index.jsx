import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import { Box } from '@material-ui/core';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import AccountPage from './../Account/pages/AccountPage';

AccountFaeture.propTypes = {};

function AccountFaeture(props) {
  const match = useRouteMatch();

  return (
    <>
      <Header />
      <Box pt={10}>
        User
        <Switch>
          <Route path={match.url} exact component={AccountPage} />
        </Switch>
      </Box>
    </>
  );
}

export default AccountFaeture;
