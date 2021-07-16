import { Box, Container, makeStyles, Paper, Typography, Button, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartList from './../components/CartList';
import { formatPrice } from './../../../utils/common';
import { cartTotalSelector } from '../selectors';
import { useHistory } from 'react-router';
import { showDialog } from 'features/Auth/userSlice';

CartPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: theme.spacing(0, 12, 4),
    height: 'auto',
    minHeight: '500px',
  },
  buttonBack: {
    textTransform: 'none',
    margin: theme.spacing(3, 0, 0.5, 15),
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  left: {
    width: '800px',
    marginRight: '10px',
    [theme.breakpoints.down('md')]: {
      width: '300px',
    },
  },

  right: {
    flex: '1 1 0',
    marginTop: '25px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },

  userInfo: {
    padding: '0 10px',
    height: '47px',
  },

  cartTotal: {
    marginTop: '10px',
    padding: '5px 10px',
  },
  button: {
    marginTop: '10px',
  },
  buttonBuy: {
    color: '#fff',
    backgroundColor: 'rgb(255, 66, 78)',
    '&:hover': {
      backgroundColor: 'rgb(255, 66, 78)',
    },
  },
  rootEmpty: {
    display: 'flex',
    padding: theme.spacing(0, 12, 10),
    height: 'auto',
    [theme.breakpoints.down('md')]: {
      height: 'auto',
      padding: theme.spacing(10, 5, 10),
    },
  },
  empty: {
    flex: '1',
    height: '500px',
  },
  emptyText: {
    textAlign: 'center',
  },
  emptyImg: {
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '20px 0',
    display: 'block',
  },
  emptyButton: {
    marginTop: '20px',
    paddingBottom: '20px',

    display: 'flex',
    justifyContent: 'center',
    // flexDirection: 'row',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  sectionMobile: {
    display: 'block',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  rootMobile: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(8, 0, 20),
    marginBottom: theme.spacing(20),
    minHeight: '500px',
  },
  rootCartMobile: {
    margin: theme.spacing(0.5, 1),
    fontSize: '15px',
    fontWeight: '500',
  },
  userInfoMobile: {
    backgroundColor: '#FFF',
    padding: theme.spacing(1),
  },
  userNameMobile: {
    fontWeight: '500',
  },
  userMailMobile: {
    // fontWeight: '500',
  },
  cartInfoMobile: {
    width: '100%',
  },
  cartBottom: {
    bottom: '0',
    left: '0',
    right: '0',
    zIndex: '2',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    backgroundColor: '#FFF',
    width: '100%',
    padding: theme.spacing(1),
    borderTop: '1px solid rgba(0,0,0,0.1)',
  },
  totalMobile: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 5px 10px',
    color: '#000',
    marginBottom: '15px',
  },
  priceTotal: {
    fontSize: '20px',
    fontWeight: '500',
    color: 'rgb(255, 66, 78)',
  },
  boxButtonMobile: {
    position: 'relative',
    padding: theme.spacing(2, 0),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOrderMobile: {
    position: 'absolute',
    padding: theme.spacing(1.2, 0),
    marginBottom: theme.spacing(0.1),
    color: '#FFF',
    backgroundColor: 'rgb(255, 66, 78)',
    bottom: '0',
    width: '100%',
    '&:hover': {
      backgroundColor: 'rgb(255, 66, 78)',
    },
  },
}));

function CartPage(props) {
  const classes = useStyles();
  const cartList = useSelector((state) => state.cart.cartItems);
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const cartTotal = useSelector(cartTotalSelector);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleCartClick = () => {
    history.push('/products');
  };
  const handleBack = () => {
    history.goBack();
  };

  const handleCheckOut = () => {
    if (isLoggedIn) {
      history.push('/orders');
    } else {
      dispatch(showDialog());
    }
  };

  if (cartList.length) {
    return (
      <>
        <Box className={classes.sectionDesktop}>
          <Button className={classes.buttonBack} color="primary" onClick={handleBack}>
            Trở lại
          </Button>
          <Container className={classes.root}>
            <Grid className={classes.left}>
              <Typography>Giỏ hàng</Typography>
              <CartList cartList={cartList} />
            </Grid>
            <Box className={classes.right}>
              {isLoggedIn ? (
                <Paper className={classes.userInfo}>
                  <Typography>Tên: {loggedInUser.fullName}</Typography>
                  <Typography>Email: {loggedInUser.email}</Typography>
                </Paper>
              ) : (
                <Paper className={classes.userInfo}>
                  <Typography>Chưa đăng nhập</Typography>
                  <Typography>Vui lòng đăng nhập để mua hàng</Typography>
                </Paper>
              )}

              <Paper className={classes.cartTotal}>
                <Typography>Thành tiền: {formatPrice(cartTotal)}</Typography>
              </Paper>
              <Paper className={classes.button}>
                <Button fullWidth className={classes.buttonBuy} onClick={handleCheckOut}>
                  Mua hàng
                </Button>
              </Paper>
            </Box>
          </Container>
        </Box>

        <Box className={classes.sectionMobile}>
          <Container className={classes.rootMobile}>
            <Typography className={classes.rootCartMobile}>Giỏ hàng</Typography>
            {isLoggedIn ? (
              <Box className={classes.userInfoMobile}>
                <Typography>Thông tin nhận hàng</Typography>
                <Typography className={classes.userNameMobile}>
                  Tên: {loggedInUser.fullName}
                </Typography>
                <Typography className={classes.userMailMobile}>
                  Email: {loggedInUser.email}
                </Typography>
              </Box>
            ) : (
              <Box className={classes.userInfoMobile}>
                <Typography>Chưa đăng nhập</Typography>
                <Typography>Vui lòng đăng nhập để mua hàng</Typography>
              </Box>
            )}
            <Grid className={classes.cartInfoMobile}>
              <CartList cartList={cartList} />
            </Grid>
            <Box className={classes.cartBottom}>
              <Box className={classes.totalMobile}>
                <Typography>Tổng cộng:</Typography>
                <Typography className={classes.priceTotal}>{formatPrice(cartTotal)}</Typography>
              </Box>
              <Box className={classes.boxButtonMobile}>
                <Button
                  className={classes.buttonOrderMobile}
                  variant="contained"
                  onClick={handleCheckOut}
                >
                  Mua hàng
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </>
    );
  } else {
    return (
      <Box>
        <Button className={classes.buttonBack} color="primary" onClick={handleBack}>
          Trở lại
        </Button>
        <Container className={classes.rootEmpty}>
          <Grid className={classes.empty}>
            <Typography>Giỏ hàng</Typography>
            <Paper>
              <img
                className={classes.emptyImg}
                src="https://salt.tikicdn.com/desktop/img/mascot@2x.png"
                alt=""
                width="20%"
              ></img>
              <Typography className={classes.emptyText}>
                Không có sản phẩm trong giỏ hàng
              </Typography>
              <Box className={classes.emptyButton}>
                <Button
                  variant="outlined"
                  color="primary"
                  // className={classes.emptyButton}
                  onClick={handleCartClick}
                >
                  Tiếp tục mua sắm
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Container>
      </Box>
    );
  }
}

export default CartPage;
