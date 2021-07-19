import React from 'react';
import { Button, Box, Container, Paper } from '@material-ui/core';
import { setStep } from 'features/CheckOut/orderSlice';

import { useDispatch, useSelector } from 'react-redux';
import ordersApi from 'api/orderApi';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import ShippingCard from '../Card/ShippingCard';
import OrderCard from '../Card/OrderCard';
import DeliveryCard from '../Card/DeliveryCard';
import { removeCartItems } from 'features/Cart/cartSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '15px 30px',
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  payment: {},
  infoOrder: {},
  infoShipp: {},
  button: {
    marginTop: '10px',
    width: '225px',
  },
}));
function PlaceOrder() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const order = useSelector((state) => state.order);
  const cartList = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user.current);
  const { id } = user;
  const handleSubmit = () => {
    const orderValues = {
      ...order,
      user: id,
      products: [...cartList],
    };
    ordersApi.add(orderValues);

    dispatch(setStep(0));
    dispatch(removeCartItems());
    history.push('/checkout/successfully');
  };
  return (
    <Box>
      <Container>
        <Paper className={classes.root}>
          <Box className={classes.info}>
            <Box className={classes.infoOrder}>
              <Paper>
                <OrderCard />
              </Paper>
            </Box>
            <Box>
              <Paper className={classes.payment}>
                <DeliveryCard />
              </Paper>
            </Box>
            <Box>
              <Paper className={classes.infoShipp}>
                <ShippingCard />
              </Paper>
            </Box>
          </Box>
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            Đặt hàng
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default PlaceOrder;
