import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { showDialog } from 'features/Auth/userSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Header from './../../components/Header';
import CustomizedSteppers from './steps';

const useStyles = makeStyles((theme) => ({
  root: {},
  checkout: {
    backgroundColor: 'rgb(245, 245, 245)',
    minHeight: '90vh',
  },
  emptyBox: {
    minHeight: '100vh',
    paddingTop: '25vh',
  },
  empty: {
    width: '450px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  emptyText: {
    color: 'rgb(238, 35, 71)',
    fontSize: '22px',
    marginBottom: '10px',
  },
  emptyButton: {},
  notLogin: {
    textAlign: 'center',
    marginTop: '35vh',
  },
}));
CheckOutFeature.propTypes = {};

function CheckOutFeature() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(showDialog());
    }
  }, [isLoggedIn, dispatch]);
  // const handleCartClick = () => {
  //   history.push('/products');
  // };
  const handleLogin = () => {
    dispatch(showDialog());
  };

  return (
    <Box>
      <Header />
      {isLoggedIn ? (
        <Box className={classes.checkout}>
          <Switch>
            <Route path={match.url} exact component={CustomizedSteppers} />
          </Switch>
        </Box>
      ) : (
        <Box className={classes.notLogin}>
          <Typography>Vui lòng đăng nhập để mua hàng.</Typography>
          <Button onClick={handleLogin} variant="outlined">
            Đăng nhập
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default CheckOutFeature;
