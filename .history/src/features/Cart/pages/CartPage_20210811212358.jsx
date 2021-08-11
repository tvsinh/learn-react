import { Box, Button, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import userApi from 'api/userApi';
import StorageKeys from 'constants/storage-keys';
import { setUser, showDialog } from 'features/Auth/userSlice';
import ShippingCard from 'features/CheckOut/components/Card/ShippingCard';
import ShippingCardMobile from 'features/CheckOut/components/Card/ShippingCard/mobile';
import { setBackTo, setEdit, setStep } from 'features/CheckOut/orderSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { cartTotalSelector } from '../selectors';
import { formatPrice } from './../../../utils/common';
import CartList from './../components/CartList';
CartPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 3, 14),
    width: '100%',
    height: 'auto',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(0, 10),
    },
  },
  buttonBack: {
    textTransform: 'none',
    margin: theme.spacing(1, -1.2, 0),

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(0, 10),
      margin: theme.spacing(10, 0, 0),
    },
    [theme.breakpoints.down('sm')]: {
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
    // flex: '1 1 0',
    marginTop: '25px',
    [theme.breakpoints.down('md')]: {
      marginTop: '0px',
      width: '100%',
    },
  },
  shippingCard: {
    width: '350px',
  },

  userInfo: {
    width: '350px',
    padding: '0 10px',
  },
  userName: {
    textTransform: 'capitalize',
  },
  userEmail: {
    width: '260px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden !important',
  },

  cartTotal: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    padding: '5px 10px',
    width: '350px',
  },
  total: {
    marginLeft: '5px',
    color: 'rgb(238, 35, 71)',
    fontSize: '22px',
  },
  button: {
    marginTop: '10px',
    width: '350px',
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
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  rootMobile: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(8, 0, 14),
    width: '100%',
  },
  rootCartMobile: {
    margin: theme.spacing(0.5, 1),
    fontSize: '15px',
    fontWeight: '500',
  },
  userInfoMobile: {
    backgroundColor: theme.palette.background.default,
    // padding: theme.spacing(1),
  },
  userNotMobile: {
    backgroundColor: theme.palette.background.default,
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

  const handleCheckOut = async () => {
    if (isLoggedIn) {
      dispatch(setStep(0));
      dispatch(setBackTo(false));
      dispatch(setEdit(false));

      const userMe = await userApi.getInfor();
      localStorage.setItem(StorageKeys.USER, JSON.stringify(userMe));
      dispatch(setUser());

      history.push('/checkout');
    } else {
      dispatch(showDialog());
    }
  };

  if (cartList.length) {
    return (
      <>
        <Box className={classes.sectionDesktop}>
          <Container>
            <Button className={classes.buttonBack} color="primary" onClick={handleBack}>
              Trở lại
            </Button>
            <Box className={classes.root}>
              <Box className={classes.left}>
                <Typography>Giỏ hàng</Typography>
                <CartList cartList={cartList} />
              </Box>
              <Box className={classes.right}>
                {isLoggedIn ? (
                  <Paper className={classes.shippingCard}>
                    <ShippingCard backTo={true} />
                  </Paper>
                ) : (
                  <Box>
                    <Paper className={classes.userInfo}>
                      <Typography>Chưa đăng nhập</Typography>
                      <Typography>Vui lòng đăng nhập để mua hàng</Typography>
                    </Paper>
                  </Box>
                )}

                <Box>
                  <Paper className={classes.cartTotal}>
                    <Typography>Thành tiền:</Typography>
                    <Typography className={classes.total}>{formatPrice(cartTotal)}</Typography>
                  </Paper>
                </Box>
                <Paper className={classes.button}>
                  <Button fullWidth className={classes.buttonBuy} onClick={handleCheckOut}>
                    Mua hàng
                  </Button>
                </Paper>
              </Box>
            </Box>
          </Container>
        </Box>

        <Box className={classes.sectionMobile}>
          <Box className={classes.rootMobile}>
            <Typography className={classes.rootCartMobile}>Giỏ hàng</Typography>
            {isLoggedIn ? (
              <Box className={classes.userInfoMobile}>
                <ShippingCardMobile backTo={true} />
              </Box>
            ) : (
              <Box className={classes.userNotMobile}>
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
          </Box>
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
