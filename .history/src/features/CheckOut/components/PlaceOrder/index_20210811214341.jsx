import { Box, Button, Container, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ordersApi from 'api/orderApi';
import productApi from 'api/productApi';
import { removeCartItems } from 'features/Cart/cartSlice';
import { setDeliveryPayment, setStep } from 'features/CheckOut/orderSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeliveryCard from '../Card/DeliveryCard';
import DeliveryCardMobile from '../Card/DeliveryCard/mobile';
import OrderCard from '../Card/OrderCard';
import OrderCardMobile from '../Card/OrderCard/mobile';
import ShippingCard from '../Card/ShippingCard';
import ShippingCardMobile from '../Card/ShippingCard/mobile';

const useStyles = makeStyles((theme) => ({
  center: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  root: {
    margin: '0 5vw 0',
    [theme.breakpoints.down('md')]: {
      // display: 'flex',
      // flexDirection: 'column',
      width: '100%',
      margin: '0',
    },
  },
  paper: {
    padding: '15px 30px',
    [theme.breakpoints.down('md')]: {
      padding: '0',
      paddingBottom: theme.spacing(1),
    },
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  infoShipp: {
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(1),
    },
  },
  payment: {
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(1),
    },
  },
  infoOrder: {
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(1),
    },
  },

  buttonBox: {
    marginTop: '10px',
    width: '225px',
    position: 'absolute',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: '5px',
      padding: theme.spacing(0, 1, 0),
    },
  },
  button: {
    width: '225px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  sectionDesktop: {
    display: 'block',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  sectionMobile: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      display: 'block',
    },
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
    <Box className={classes.center}>
      <Container className={classes.root}>
        {/* <Paper className={classes.paper}> */}
        <Box className={classes.info}>
          <Box className={classes.sectionDesktop}>
            <Paper className={classes.infoShipp}>
              <ShippingCard edit={true} backTo={false} />
            </Paper>
          </Box>
          <Box className={classes.sectionMobile}>
            <Paper className={classes.infoShipp}>
              <ShippingCardMobile edit={true} backTo={false} />
            </Paper>
          </Box>

          <Box className={classes.sectionDesktop}>
            <Paper className={classes.payment}>
              <DeliveryCard />
            </Paper>
          </Box>
          <Box className={classes.sectionMobile}>
            <Paper className={classes.payment}>
              <DeliveryCardMobile />
            </Paper>
          </Box>

          <Box className={classes.sectionDesktop}>
            <Paper className={classes.infoOrder}>
              <OrderCard deliveryPriceFinal={deliveryPrice} />
            </Paper>
          </Box>
          <Box className={classes.sectionMobile}>
            <Paper className={classes.infoOrder}>
              <OrderCardMobile deliveryPriceFinal={deliveryPrice} />
            </Paper>
          </Box>
        </Box>
        <Box className={classes.buttonBox}>
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
        </Box>
        {/* </Paper> */}
      </Container>
    </Box>
  );
}

export default PlaceOrder;
