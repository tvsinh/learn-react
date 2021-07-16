import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import CustomizedSteppers from './steps';
import Header from './../../components/Header';
import { Box, Typography, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { showDialog } from 'features/Auth/userSlice';

CheckOutFeature.propTypes = {};

function CheckOutFeature() {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(showDialog());
    }
  }, [isLoggedIn, dispatch]);
  const handleLogin = () => {
    dispatch(showDialog());
  };
  return (
    <>
      <Header />
      {isLoggedIn ? (
        <Box>
          <Switch>
            <Route path={match.url} exact component={CustomizedSteppers} />
          </Switch>
        </Box>
      ) : (
        <Box style={{ textAlign: 'center', marginTop: '35vh' }}>
          <Typography>Vui lòng đăng nhập để mua hàng.</Typography>
          <Button onClick={handleLogin} variant="outlined">
            Đăng nhập
          </Button>
        </Box>
      )}
    </>
  );
}

export default CheckOutFeature;
