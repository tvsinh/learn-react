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
import productApi from 'api/productApi';

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
  const deliveryPrice = useSelector((state) => state.order.deliveryPrice);

  const handleSubmit = async () => {
    const orderValues = {
      ...order,
      user: user.id,
      products: [...cartList],
    };
    await ordersApi.add(orderValues);
    cartList.forEach(async (product) => {
      const dataQty = await productApi.get(product.id);
      const data = {
        id: product.id,
        quantity: dataQty.quantity - product.quantity,
      };
      // console.log(data);
      // console.log(dataQty.quantity);
      await productApi.update(data);
    });
    dispatch(setStep(0));
    dispatch(removeCartItems());
    history.push('/checkout/successfully');
  };
  return (
    <Box>
      <Container>
        <Paper className={classes.root}>
          <Box className={classes.info}>
            <Box>
              <Paper className={classes.infoShipp}>
                <ShippingCard />
              </Paper>
            </Box>
            <Box>
              <Paper className={classes.payment}>
                <DeliveryCard />
              </Paper>
            </Box>
            <Box className={classes.infoOrder}>
              <Paper>
                <OrderCard deliveryPriceFinal={deliveryPrice} />
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
