import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch, useHistory } from 'react-router-dom';

import CustomizedSteppers from './steps';
import Header from './../../components/Header';
import { Box, Typography, Button, Paper, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { showDialog } from 'features/Auth/userSlice';
import Successfully from './components/Successfully';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'rgb(245, 245, 245)',
  },
  checkout: {
    minHeight: '100vh',
  },
  emptyBox: {
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
  const history = useHistory();

  const cartList = useSelector((state) => state.cart.cartItems);
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(showDialog());
    }
  }, [isLoggedIn, dispatch]);
  const handleCartClick = () => {
    history.push('/products');
  };
  const handleLogin = () => {
    dispatch(showDialog());
  };
  return (
    <Box>
      <Header />
      {isLoggedIn ? (
        <Box className={classes.root}>
          <Box className={classes.checkout}>
            <Switch>
              <Route path={match.url} exact component={CustomizedSteppers} />
              <Route path={`${match.url}/successfully`} exact component={Successfully} />
            </Switch>
          </Box>
          {/* {cartList.length ? (
            <Box className={classes.checkout}>
              <Switch>
                <Route path={match.url} exact component={CustomizedSteppers} />
                <Route path={`${match.url}/successfully`} exact component={Successfully} />
              </Switch>
            </Box>
          ) : (
            <Box className={classes.emptyBox}>
              <Paper className={classes.empty}>
                <Typography className={classes.emptyText}>
                  Không có sản phẩm trong giỏ hàng.
                </Typography>
                <Box className={classes.emptyButton}>
                  <Button variant="outlined" color="primary" onClick={handleCartClick}>
                    Tiếp tục mua sắm
                  </Button>
                </Box>
              </Paper>
            </Box>
          )} */}
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
