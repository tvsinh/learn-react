import React, { useEffect, useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button, Box, Paper, Typography, Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { setDeliveryPayment, setStep, setTotalOrder } from 'features/CheckOut/orderSlice';
import ShippingCard from '../Card/ShippingCard';
import OrderCard from '../Card/OrderCard';
import { cartTotalSelector } from 'features/Cart/selectors';
import OrderCardMobile from '../Card/OrderCard/mobile';
import ShippingCardMobile from '../Card/ShippingCard/mobile';

const useStyles = makeStyles((theme) => ({
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
  root: {
    display: 'flex',
    justifyContent: 'space-between',

    margin: '0 5vw 0',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      margin: '0',
    },
  },
  form: {
    // flex: '1 1 0',
    width: '450px',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      order: '3',
      width: '100%',
      margin: theme.spacing(1, 0, 1),
      paddingBottom: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
      borderBottom: '1px solid rgba(0, 0, 0, .4)',
    },
  },
  formDelivery: {
    padding: '10px',
    marginBottom: '10px',
  },
  formPayment: {
    padding: '10px',
    marginBottom: '10px',
  },
  error: {
    marginBottom: '2px',
    color: 'rgb(238, 35, 71)',
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(1),
    },
  },
  buttonBox: {
    width: '225px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      padding: theme.spacing(0, 1, 0),
    },
  },
  button: {
    width: '225px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  infoShip: {
    [theme.breakpoints.down('md')]: {
      order: '1',
      marginBottom: theme.spacing(1),
    },
  },
  infoOrder: {
    [theme.breakpoints.down('md')]: {
      order: '2',
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

function Payment() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { delivery, payment } = useSelector((state) => state.order);
  const [valueDelivery, setValueDelivery] = useState(delivery);
  const [valuePayment, setValuePayment] = useState(payment);
  const [error, setError] = useState(false);
  const cartTotal = useSelector(cartTotalSelector);
  const handleChangeDelivery = (event) => {
    setValueDelivery(event.target.value);
  };
  const handleChangePay = (event) => {
    setValuePayment(event.target.value);
  };
  useEffect(() => {
    if ((valueDelivery !== '') & (valuePayment !== '')) {
      setError(false);
    }
  }, [valueDelivery, valuePayment]);
  const handleSubmit = () => {
    if (valueDelivery === '' || valuePayment === '') {
      setError(true);
      return;
    }
    dispatch(setStep(2));
    const deliveryPrice =
      valueDelivery === 'Giao h??ng nhanh'
        ? 50000
        : valueDelivery === 'Giao h??ng ti???t ki???m'
        ? 30000
        : 0;
    const values = {
      valueDelivery,
      valuePayment,
      deliveryPrice,
    };
    dispatch(setDeliveryPayment(values));
    dispatch(setTotalOrder(deliveryPrice + cartTotal));
  };

  return (
    <Box className={classes.center}>
      <Container className={classes.root}>
        <Box className={`${classes.infoShip} + ${classes.sectionDesktop} `}>
          <Paper className={classes.infoShip}>
            <ShippingCard edit={true} />
          </Paper>
        </Box>
        <Box className={`${classes.infoShip} + ${classes.sectionMobile} `}>
          <Paper>
            <ShippingCardMobile edit={true} />
          </Paper>
        </Box>

        <Box className={classes.form}>
          <Box>
            <Paper className={classes.formDelivery}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Ch???n h??nh th???c giao h??ng</FormLabel>
                <RadioGroup
                  aria-label="delivery"
                  name="delivery"
                  value={valueDelivery}
                  onChange={handleChangeDelivery}
                  defaultValue={delivery}
                >
                  <FormControlLabel
                    value="Giao h??ng ti???t ki???m"
                    control={<Radio color="primary" />}
                    label="Giao h??ng ti???t ki???m"
                  />
                  <FormControlLabel
                    value="Giao h??ng nhanh"
                    control={<Radio color="primary" />}
                    label="Giao h??ng nhanh"
                  />
                </RadioGroup>
              </FormControl>
            </Paper>
          </Box>
          <Box>
            <Paper className={classes.formPayment}>
              <FormControl>
                <FormLabel component="legend">Ch???n h??nh th???c thanh to??n</FormLabel>
                <RadioGroup
                  aria-label="payment"
                  name="payment"
                  value={valuePayment}
                  onChange={handleChangePay}
                  defaultValue={payment}
                >
                  <FormControlLabel
                    value="Thanh to??n khi nh???n h??ng"
                    control={<Radio color="primary" />}
                    label="Thanh to??n khi nh???n h??ng"
                  />
                  <FormControlLabel
                    value="Thanh to??n b???ng th???"
                    control={<Radio color="primary" />}
                    label="Thanh to??n b???ng th???"
                  />
                </RadioGroup>
              </FormControl>
            </Paper>
          </Box>
          {error && (
            <Typography className={classes.error}>
              Vui l??ng ch???n ?????y ????? h??nh th???c giao h??ng & thanh to??n.
            </Typography>
          )}
          <Box className={classes.buttonBox}>
            <Button
              className={classes.button}
              size="large"
              color="primary"
              variant="contained"
              onClick={handleSubmit}
            >
              Ti???p t???c
            </Button>
          </Box>
        </Box>

        <Box className={`${classes.infoOrder} + ${classes.sectionDesktop} `}>
          <Paper>
            <OrderCard valueDelivery={valueDelivery} />
          </Paper>
        </Box>
        <Box className={`${classes.infoOrder} + ${classes.sectionMobile} `}>
          <Paper>
            <OrderCardMobile valueDelivery={valueDelivery} />
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default Payment;
