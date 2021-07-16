import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';
import InputField from 'components/form-controls/InputField';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { setStep } from 'features/Cart/cartSlice';

Shipping.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function Shipping({ onSubmit }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const form = useForm();
  const handleSubmit = (values) => {
    dispatch(setStep(1));
    if (!onSubmit) return;
    onSubmit(values);
  };
  return (
    <Box>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={classes.root}>
        <InputField name="shipping" label="Địa chỉ nhận hàng" form={form} />
        <InputField name="shipping1" label="Địa chỉ nhận hàng 1" form={form} />
        <Button
          // className={classes.submit}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          // disabled={isSubmitting}
        >
          Next
        </Button>
      </form>
    </Box>
  );
}

export default Shipping;
