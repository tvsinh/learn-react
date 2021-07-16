import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { setStep } from 'features/Cart/cartSlice';

Payment.propTypes = {
  onChange: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  root: {},
}));

function Payment({ onChange }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [valueDelivery, setValueDelivery] = React.useState('Giao hàng tiết kiệm');
  const [valuePay, setValuePay] = React.useState('Thanh toán khi nhận hàng');

  const handleChangeDelivery = (event) => {
    setValueDelivery(event.target.value);
  };
  const handleChangePay = (event) => {
    setValuePay(event.target.value);
  };
  const handleSubmit = () => {
    dispatch(setStep(2));
    if (!onChange) return;
    const values = {
      valueDelivery,
      valuePay,
    };
    onChange(values);
  };

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Chọn hình thức giao hàng</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={valueDelivery}
          onChange={handleChangeDelivery}
          defaultValue="Giao hàng tiết kiệm"
        >
          <FormControlLabel
            value="Giao hàng tiết kiệm"
            control={<Radio />}
            label="Giao hàng tiết kiệm"
          />
          <FormControlLabel value="Giao hàng nhanh" control={<Radio />} label="Giao hàng nhanh" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel component="legend">Chọn hình thức thanh toán</FormLabel>
        <RadioGroup
          aria-label="gender2"
          name="gender2"
          value={valuePay}
          onChange={handleChangePay}
          defaultValue="Thanh toán khi nhận hàng"
        >
          <FormControlLabel
            value="Thanh toán khi nhận hàng"
            control={<Radio />}
            label="Thanh toán khi nhận hàng"
          />
          <FormControlLabel
            value="Thanh toán bằng thẻ"
            control={<Radio />}
            label="Thanh toán bằng thẻ"
          />
        </RadioGroup>
      </FormControl>
      <Button
        // className={classes.submit}
        // disabled={isSubmitting}
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        onClick={handleSubmit}
      >
        Next
      </Button>
    </>
  );
}

export default Payment;
