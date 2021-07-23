import { Box, Button, Container, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ordersApi from 'api/orderApi';
import productApi from 'api/productApi';
import { removeCartItems } from 'features/Cart/cartSlice';
import { setDeliveryPayment, setStep } from 'features/CheckOut/orderSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeliveryCard from '../Card/DeliveryCard';
import OrderCard from '../Card/OrderCard';
import ShippingCard from '../Card/ShippingCard';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '15px 30px',
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
    },
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
      await productApi.update(data);
    });
    dispatch(removeCartItems());
    dispatch(
      setDeliveryPayment({
        valueDelivery: '',
        valuePayment: '',
        deliveryPrice: 0,
      })
    );
    dispatch(setStep(3));
  };
  return (
    <Box>
      <Container>
        <Paper className={classes.root}>
          <Box className={classes.info}>
            <Box>
              <Paper className={classes.infoShipp}>
                <ShippingCard edit={true} backTo={false} />
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
