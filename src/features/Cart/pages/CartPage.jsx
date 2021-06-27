import { Box, Container, makeStyles, Paper, Typography, Button, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import CartList from './../components/CartList';
import { formatPrice } from './../../../utils/common';
import { cartTotalSelector } from '../selectors';
import { useHistory } from 'react-router';

CartPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: theme.spacing(7, 12, 0),
    height: '600px',
    [theme.breakpoints.down('md')]: {
      height: '400px',
      padding: theme.spacing(10, 5, 0),
    },
  },
  left: {
    width: '800px',
    marginRight: '10px',
  },

  right: {
    flex: '1 1 0',
    marginTop: '25px',
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
  empty: {
    flex: '1',
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
}));

function CartPage(props) {
  const classes = useStyles();
  const cartList = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user.current);
  const cartTotal = useSelector(cartTotalSelector);
  const history = useHistory();
  const handleCartClick = () => {
    history.push('/products');
  };
  if (cartList.length) {
    return (
      <Box>
        <Container className={classes.root}>
          <Grid className={classes.left}>
            <Typography>Giỏ hàng</Typography>
            <CartList cartList={cartList} />
          </Grid>
          <Box className={classes.right}>
            {user.id ? (
              <Paper className={classes.userInfo}>
                <Typography>Tên: {user.fullName}</Typography>
                <Typography>Email: {user.email}</Typography>
              </Paper>
            ) : (
              <Paper className={classes.userInfo}>
                <Typography>Chưa đăng nhập</Typography>
                <Typography>Vui lòng đăng nhập để mua hàng</Typography>
              </Paper>
            )}

            <Paper className={classes.cartTotal}>
              <Typography>Tổng cộng: {formatPrice(cartTotal)}</Typography>
            </Paper>
            <Paper className={classes.button}>
              <Button fullWidth>Mua hàng</Button>
            </Paper>
          </Box>
        </Container>
      </Box>
    );
  } else {
    return (
      <Box className={classes.empty}>
        <Container className={classes.root}>
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
