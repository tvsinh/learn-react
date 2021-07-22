import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button, Box, Container, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { setDeliveryPayment, setStep, setTotalOrder } from 'features/CheckOut/orderSlice';
import ShippingCard from '../Card/ShippingCard';
import OrderCard from '../Card/OrderCard';
import { cartTotalSelector } from 'features/Cart/selectors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  form: {
    flex: '1 1 0',
    display: 'flex',
    flexDirection: 'column',
  },
  formDelivery: {
    padding: '10px',
    marginBottom: '10px',
  },
  formPayment: {
    padding: '10px',
    marginBottom: '10px',
  },
  button: {},
  infoOrder: {
    marginLeft: '10px',
  },
  infoShip: {
    marginBottom: '10px',
  },
}));

function Payment() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { delivery, payment } = useSelector((state) => state.order);
  const [valueDelivery, setValueDelivery] = React.useState(delivery);
  const [valuePayment, setValuePayment] = React.useState(payment);
  const cartTotal = useSelector(cartTotalSelector);
  const handleChangeDelivery = (event) => {
    setValueDelivery(event.target.value);
  };
  const handleChangePay = (event) => {
    setValuePayment(event.target.value);
  };
  const handleSubmit = () => {
    dispatch(setStep(2));
    const deliveryPrice =
      valueDelivery === 'Giao hàng nhanh'
        ? 50000
        : valueDelivery === 'Giao hàng tiết kiệm'
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
    <Box>
      <Container className={classes.root}>
        <Box className={classes.form}>
          <Box>
            <Paper className={classes.formDelivery}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Chọn hình thức giao hàng</FormLabel>
                <RadioGroup
                  aria-label="delivery"
                  name="delivery"
                  value={valueDelivery}
                  onChange={handleChangeDelivery}
                  defaultValue={delivery}
                >
                  <FormControlLabel
                    value="Giao hàng tiết kiệm"
                    control={<Radio color="primary" />}
                    label="Giao hàng tiết kiệm"
                  />
                  <FormControlLabel
                    value="Giao hàng nhanh"
                    control={<Radio color="primary" />}
                    label="Giao hàng nhanh"
                  />
                </RadioGroup>
              </FormControl>
            </Paper>
          </Box>
          <Box>
            <Paper className={classes.formPayment}>
              <FormControl>
                <FormLabel component="legend">Chọn hình thức thanh toán</FormLabel>
                <RadioGroup
                  aria-label="payment"
                  name="payment"
                  value={valuePayment}
                  onChange={handleChangePay}
                  defaultValue={payment}
                >
                  <FormControlLabel
                    value="Thanh toán khi nhận hàng"
                    control={<Radio color="primary" />}
                    label="Thanh toán khi nhận hàng"
                  />
                  <FormControlLabel
                    value="Thanh toán bằng thẻ"
                    control={<Radio color="primary" />}
                    label="Thanh toán bằng thẻ"
                  />
                </RadioGroup>
              </FormControl>
            </Paper>
          </Box>
          <Button
            size="large"
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            style={{ width: '225px' }}
          >
            Tiếp tục
          </Button>
        </Box>
        <Box className={classes.infoOrder}>
          <Paper className={classes.infoShip}>
            <ShippingCard />
          </Paper>
          <Paper>
            <OrderCard valueDelivery={valueDelivery} />
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default Payment;
